import Airtable, { FieldSet } from 'airtable';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Artist, Artwork } from '@/types';

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

  const artworks = await artworksTable.select({
    filterByFormula: `{email} = '${email}'`,
  }).all();

  console.log(artworks);
  
  return (
    <div className="">
      <div className="fixed w-screen h-screen top-0 left-0 px-20">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex justify-between gap-16 w-full">
            <div className="">
              <div className="w-full flex flex-col items-center gap-6">
                <button className="py-2 px-4 rounded-full border border-black uppercase">Edit profile</button>
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
                <div className="flex flex-nowrap gap-2">Name</div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl">Your Artworks</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {artworks.map((artwork) => (
                  <div key={artwork.id} className="relative group">
                  <img
                    src={artwork.fields.file}
                    alt={artwork.fields.name}
                    className="w-full h-auto object-cover aspect-square"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-lg font-semibold">{artwork.fields.title}</span>
                  </div>
                  </div>
                ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}