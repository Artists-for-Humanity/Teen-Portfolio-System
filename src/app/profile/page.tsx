import Airtable from 'airtable';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Artist, Artwork } from '@/types';
import EditProfile from '@/components/EditProfile';
import EditBio from '@/components/EditBio';
import PersonalArtworkView from '@/components/PersonalArtworkView';
import LogOutButton from '@/components/LogOutButton';
import ArtistUploadForm from '@/components/ArtistUploadForm';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID!);
const usersTable = base('Users');
const artworksTable = base('Artwork');

export default async function Profile() {
  const all = (await cookies());

  const sessionCookie = all.get('session');
  const emailCookie = all.get('email');

  if (!sessionCookie || !emailCookie) {
    redirect('/login');
  }

  const email = emailCookie.value;

  const artist: Artist = (await usersTable.select({
    filterByFormula: `{email} = '${email}'`,
  }).all())[0].fields as unknown as Artist;

  const allArtworks = await artworksTable.select({
    filterByFormula: `{email} = '${email}'`,
  }).all();

  const artworks = allArtworks.filter(artwork => artwork.fields.approved === true);
  const pendingArtworks = allArtworks.filter(artwork => artwork.fields.approved !== true);
  
  return (
    <div className="">
      <div className="w-screen h-screen px-20 pt-6">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex justify-between gap-16 w-full h-full">
            <div className="w-full max-w-sm">
              <div className="fixed top-0 w-full max-w-sm flex flex-col items-center gap-6 h-screen justify-center">
                <EditProfile />
                <div className="aspect-square rounded-full bg-zinc-100 h-[30vh] relative" style={{
                  backgroundImage: `url(${artist.photo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-black/30 text-white font-semibold rounded-full px-4 py-2">
                      Upload Photo
                    </button>
                  </div>
                </div>
                <div className="text-2xl font-bold">{artist.name}</div>
                <div className="text-base text-center">
                  {artist.bio} <EditBio />
                </div>
                <LogOutButton />
              </div>
            </div>
            <div className="w-full h-screen">
              <PersonalArtworkView name="My Artworks" artworks={artworks.map(a => ({
                ...a.fields as object,
              }) as Artwork)} />
              <hr className="my-8 opacity-25" />
              <PersonalArtworkView name="Pending Artworks" artworks={pendingArtworks.map(a => ({
                ...a.fields as object,
              }) as Artwork)} />
              <hr className="my-8 opacity-25" />
              <div className="text-2xl font-bold mb-3">Upload Artwork</div>
              <ArtistUploadForm profile={{
                ...artist
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}