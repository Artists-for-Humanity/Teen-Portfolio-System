'use client';
import { Filters as FilterType } from '@/types';
import { createContext } from 'react';



export const FiltersContext = createContext<FilterType>({
  artist: "",
  title: "",
  studio: "graphic-design",
  price: {
    min: 0,
    max: 1000,
  },
});

export default function Filters({ filters, setFilters }:{ filters: FilterType, setFilters: (f: FilterType) => void }) {
  return (
    <div>
      <div className="text-2xl font-bold">Filters</div>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={filters.title || ''}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Artist"
          value={filters.artist || ''}
          onChange={(e) => setFilters({ ...filters, artist: e.target.value })}
          className="border p-2 rounded w-full"
        />
        {/* <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label htmlFor="price-min" className="block text-sm uppercase font-bold text-stone-400 mb-2">
              Minimum Price
            </label>
            <input
              id="price-min"
              type="number"
              min="0"
              max="999"
              value={filters.price?.min || 0}
              onChange={(e) => setFilters({ 
          ...filters, 
          price: { ...filters.price, min: Number(e.target.value) } 
              })}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="price-max" className="block text-sm uppercase font-bold text-stone-400 mb-2">
              Maximum Price
            </label>
            <input
              id="price-max"
              type="number"
              min="1"
              max="1000"
              value={filters.price?.max || 1000}
              onChange={(e) => setFilters({ 
          ...filters, 
          price: { ...filters.price, max: Number(e.target.value) } 
              })}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
        <div className="text-sm text-gray-500 mt-2">
          Selected Range: ${filters.price?.min || 0} - ${filters.price?.max || 1000}
        </div> */}
      </div>
    </div>
  )
}