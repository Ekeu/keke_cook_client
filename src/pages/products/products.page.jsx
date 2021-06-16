import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { AdjustmentsIcon } from '@heroicons/react/outline';
import {
  InstantSearch,
  SearchBox,
  Pagination,
  RatingMenu,
  VoiceSearch,
  PoweredBy,
  Configure,
} from 'react-instantsearch-dom';

import AlgoliaCustomHits from '../../components/algolia-custom-hits/algolia-custom-hits.component';
import AlgoliaRefinementList from '../../components/algolia-refinement-list/algolia-refinement-list.component';
import AlgoliaNumericMenu from '../../components/algolia-numeric-menu/algolia-numeric-menu.component';
import AlgoliaToggleRefinement from '../../components/algolia-toggle-refinement/algolia-toggle-refinement.component';
import AlgoliaClearRefinements from '../../components/algolia-clear-refinements/algolia-clear-refinements.component';
import AlgoliaStats from '../../components/algolia-stats/algolia-stats.component';
import AlgoliaSectionHeading from '../../components/algolia-section-heading/algolia-section-heading.component';
import AlgoliaSortBy from '../../components/algolia-sortby/algolia-sortby.component';
import SlideOver from '../../components/slide-over/slide-over.component';

const searchClient = algoliasearch(
  '58LMZ6QOTT',
  'ec682cfa8ab3eefa7316e730c4767485'
);

const Products = () => {
  const [openFilters, setOpenFilters] = useState(false);
  const [enabled, setEnabled] = useState(false);

  return (
    <div className='relative'>
      <InstantSearch indexName='keke-products' searchClient={searchClient}>
        <SlideOver
          open={openFilters}
          setOpen={setOpenFilters}
          title={'Trier et Filtrer'}
          showStickyFooter={true}
          button={
            <AlgoliaStats setOpenFilters={setOpenFilters} inModal={true} />
          }
          button2={<AlgoliaClearRefinements setEnabled={setEnabled} />}
          unmount={openFilters}
        >
          <div className='space-y-6'>
            <div>
              <span className='inline-block bg-violet-200 text-violet-600 text-xs uppercase tracking-widest font-semibold px-2 py-0.5 rounded-sm'>
                Categorie
              </span>
              <AlgoliaRefinementList attribute='category.name' />
            </div>
            <div>
              <span className='inline-block bg-violet-200 text-violet-600 text-xs uppercase tracking-widest font-semibold px-2 py-0.5 rounded-sm'>
                Produit
              </span>
              <AlgoliaRefinementList attribute='subcategories.name' />
            </div>
            <div>
              <span className='inline-block bg-violet-200 text-violet-600 text-xs uppercase tracking-widest font-semibold px-2 py-0.5 rounded-sm'>
                Couleur
              </span>
              <AlgoliaRefinementList attribute='color' />
            </div>
            <div>
              <span className='inline-block bg-violet-200 text-violet-600 text-xs uppercase tracking-widest font-semibold px-2 py-0.5 rounded-sm'>
                Prix
              </span>
              <AlgoliaNumericMenu
                attribute='range_price'
                items={[
                  { end: 10, label: '<10€' },
                  { start: 10, end: 100, label: '10€-100€' },
                  { start: 100, end: 300, label: '100€-200€' },
                  { start: 300, label: '>300€' },
                ]}
                translations={{
                  all: 'Tous les produits',
                }}
              />
            </div>
            <div>
              <span className='inline-block bg-violet-200 text-violet-600 text-xs uppercase tracking-widest font-semibold px-2 py-0.5 rounded-sm'>
                Note
              </span>
              <RatingMenu attribute='ratings.rating' min={1} max={5} />
            </div>
            <div className='space-y-2'>
              <span className='inline-block bg-violet-200 text-violet-600 text-xs uppercase tracking-widest font-semibold px-2 py-0.5 rounded-sm'>
                Livraison
              </span>
              <AlgoliaToggleRefinement
                attribute='shipping'
                label='Livraison Gratuite'
                value={'Oui'}
                enabled={enabled}
                setEnabled={setEnabled}
              />
            </div>
          </div>
        </SlideOver>
        <div className='flex overflow-hidden bg-white'>
          {/* Static sidebar for desktop */}
          <div className='hidden bg-white md:flex md:flex-shrink-0'>
            <div className='flex flex-col w-64'>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className='flex flex-col flex-grow pt-5 pb-4 overflow-y-auto'>
                <div className='flex-1 flex flex-col'>
                  <div className='flex-1 px-4 space-y-4 font-hind'>
                    <div className='md:flex md:items-center md:justify-between'>
                      <div className='flex-1 min-w-0'>
                        <h3 className='text-xl uppercase font-bold leading-7 text-blue-gray-800 sm:truncate tracking-wide'>
                          Filtrer
                        </h3>
                      </div>
                      <div className='mt-4 flex md:mt-0 md:ml-4'>
                        <AlgoliaClearRefinements setEnabled={setEnabled} />
                      </div>
                    </div>
                    <div>
                      <span className='inline-block bg-violet-200 text-violet-600 text-xs uppercase tracking-widest font-semibold px-2 py-0.5 rounded-sm'>
                        Categorie
                      </span>
                      <AlgoliaRefinementList attribute='category.name' />
                    </div>
                    <div>
                      <span className='inline-block bg-violet-200 text-violet-600 text-xs uppercase tracking-widest font-semibold px-2 py-0.5 rounded-sm'>
                        Produit
                      </span>
                      <AlgoliaRefinementList attribute='subcategories.name' />
                    </div>
                    <div>
                      <span className='inline-block bg-violet-200 text-violet-600 text-xs uppercase tracking-widest font-semibold px-2 py-0.5 rounded-sm'>
                        Couleur
                      </span>
                      <AlgoliaRefinementList attribute='color' />
                    </div>
                    <div>
                      <span className='inline-block bg-violet-200 text-violet-600 text-xs uppercase tracking-widest font-semibold px-2 py-0.5 rounded-sm'>
                        Prix
                      </span>
                      <AlgoliaNumericMenu
                        attribute='range_price'
                        items={[
                          { end: 10, label: '<10€' },
                          { start: 10, end: 100, label: '10€-100€' },
                          { start: 100, end: 300, label: '100€-200€' },
                          { start: 300, label: '>300€' },
                        ]}
                        translations={{
                          all: 'Tous les produits',
                        }}
                      />
                    </div>
                    <div>
                      <span className='inline-block bg-violet-200 text-violet-600 text-xs uppercase tracking-widest font-semibold px-2 py-0.5 rounded-sm'>
                        Note
                      </span>
                      <RatingMenu attribute='ratings.rating' min={1} max={5} />
                    </div>
                    <div className='space-y-2'>
                      <span className='inline-block bg-violet-200 text-violet-600 text-xs uppercase tracking-widest font-semibold px-2 py-0.5 rounded-sm'>
                        Livraison
                      </span>
                      <AlgoliaToggleRefinement
                        attribute='shipping'
                        label='Livraison Gratuite'
                        value={'Oui'}
                        enabled={enabled}
                        setEnabled={setEnabled}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-0 flex-1 overflow-hidden preview-search-area'>
            <main className='flex-1 relative overflow-y-auto focus:outline-none'>
              <div className='mt-4 mx-auto max-w-md px-4 sm:max-w-lg sm:px-6 lg:px-8 lg:max-w-7xl'>
                <nav className='bg-white rounded-lg md:hidden'>
                  <div className='max-w-7xl mx-auto px-1'>
                    <div className='flex justify-end h-16'>
                      <div className='-mr-2 flex items-center'>
                        {/* Mobile menu button */}
                        <button
                          onClick={() => {
                            setOpenFilters(true);
                          }}
                          className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-4 rounded-md bg-violet-100 text-violet-800 focus:outline-none'
                        >
                          <span className='uppercase font-hind font-medium tracking-wider'>
                            Filtrer
                          </span>
                          <AdjustmentsIcon
                            className='ml-2 -mr-1 h-4 w-4'
                            aria-hidden='true'
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </nav>
                <div className='transition duration-150 ease-in delay-0 rounded-sm mb-2 relative py-2'>
                  <div className='w-full'>
                    <div className='relative flex items-center p-4 h-16 rounded-lg bg-white shadow-md'>
                      <div className='relative flex-grow'>
                        <SearchBox
                          translations={{
                            submitTitle: 'Soumettez votre recherche.',
                            resetTitle: 'Effacez votre recherche.',
                            placeholder: 'Rechercher un produit.',
                          }}
                        />
                      </div>
                      <span className='hidden lg:block'>
                        <PoweredBy />
                      </span>
                      <VoiceSearch />
                    </div>
                  </div>
                </div>
                <AlgoliaSectionHeading>
                  <AlgoliaStats inModal={false} />
                  <AlgoliaSortBy
                    defaultRefinement='keke-products'
                    items={[
                      { value: 'keke-products', name: 'Trier par popularité' },
                      {
                        value: 'keke-products-price-asc',
                        name: 'Trier par tarif croissant',
                      },
                      {
                        value: 'keke-products-price-desc',
                        name: 'Trier par taris décroissant',
                      },
                    ]}
                  />
                </AlgoliaSectionHeading>
              </div>
              <Configure hitsPerPage={6} />
              <AlgoliaCustomHits />
              <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-poppins flex justify-center'>
                <Pagination />
              </div>
            </main>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
};

export default Products;
