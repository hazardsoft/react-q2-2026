export type HomeHref = {
  pathname: '/';
  query: { page: number; query?: string; details?: string };
};

// Builds a locale-agnostic href for the search results page, preserving the
// provided search params. Used by links and client-side navigation.
export const homeHref = ({
  page,
  query,
  details,
}: {
  page: number;
  query?: string;
  details?: string;
}): HomeHref => ({
  pathname: '/',
  query: {
    page,
    ...(query ? { query } : {}),
    ...(details ? { details } : {}),
  },
});
