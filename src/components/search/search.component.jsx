import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import { createAlgoliaInsightsPlugin } from '@algolia/autocomplete-plugin-algolia-insights';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import insightsClient from 'search-insights';

import AlgoliaAutocomplete from '../algolia-autocomplete/algolia-autocomplete.component';
import AAProduct from '../algolia-autocomplete-product/algolia-autocomplete-product.component';

const appId = process.env.REACT_APP_ALGOLIA_APPLICATION_ID;
const apiKey = process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_API_KEY;
const searchClient = algoliasearch(appId, apiKey);

insightsClient('init', { appId, apiKey });

const algoliaInsightsPlugin = createAlgoliaInsightsPlugin({ insightsClient });

const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: 'keke-products-query-suggestions-history-with-category',
  limit: 6,
});

const querySuggestionsPlugin = createQuerySuggestionsPlugin({
  searchClient,
  indexName: 'keke-products-query-suggestions',
  getSearchParams() {
    return recentSearchesPlugin.data.getAlgoliaSearchParams({
      hitsPerPage: 5,
    });
  },
  categoryAttribute: ['keke-products', 'facets', 'exact_matches', 'category'],
});

const Search = () => {
  const detachedMode = 'none';
  return (
    <>
      <div
        className={`flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end nav-search-preview ${
          detachedMode === 'none' ? 'notDetached' : 'detached'
        }`}
      >
        <AlgoliaAutocomplete
          detachedMediaQuery={detachedMode}
          placeholder={'Rechercher dans Keke Cook'}
          openOnFocus={true}
          plugins={[
            algoliaInsightsPlugin,
            recentSearchesPlugin,
            querySuggestionsPlugin,
          ]}
          defaultActiveItemId={0}
          getSources={({ query, state }) => {
            if (!query) {
              return [];
            }
            return [
              {
                sourceId: 'products',
                getItems() {
                  return getAlgoliaResults({
                    searchClient,
                    queries: [
                      {
                        indexName: 'keke-products',
                        query,
                        params: {
                          clickAnalytics: true,
                          attributesToSnippet: ['title:10'],
                          snippetEllipsisText: '...',
                        },
                      },
                    ],
                  });
                },
                getItemUrl({ item }) {
                  return `/product/${item.slug}`;
                },
                templates: {
                  header() {
                    return (
                      <>
                        <span className='aa-SourceHeaderTitle'>Produits</span>
                        <div className='aa-SourceHeaderLine' />
                      </>
                    );
                  },
                  item({ item, components }) {
                    return (
                      <AAProduct
                        hit={item}
                        components={components}
                        insights={state.context.algoliaInsightsPlugin.insights}
                      />
                    );
                  },
                  noResults() {
                    return 'No products for this query.';
                  },
                },
              },
            ];
          }}
        />
      </div>
    </>
  );
};

export default Search;
