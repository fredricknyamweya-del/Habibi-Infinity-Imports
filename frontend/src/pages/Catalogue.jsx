import { useEffect, useMemo, useState } from 'react';
import { FiSliders } from 'react-icons/fi';
import { useParams, useSearchParams } from 'react-router-dom';
import { getProducts } from '../api/products.js';
import FilterSidebar from '../components/catalog/FilterSidebar.jsx';
import Pagination from '../components/catalog/Pagination.jsx';
import ProductGrid from '../components/catalog/ProductGrid.jsx';
import SortDropdown from '../components/catalog/SortDropdown.jsx';
import Container from '../components/ui/Container.jsx';
import Input from '../components/ui/Input.jsx';
import SectionTitle from '../components/ui/SectionTitle.jsx';
import { categories } from '../config/site.js';
import { useCountry } from '../context/CountryContext.jsx';

export default function Catalogue() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { country } = useCountry();
  const category = categories.find((item) => item.slug === slug);
  const params = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);
  const heading = category?.name || 'Shop all';

  useEffect(() => {
    let active = true;
    setLoading(true);
    getProducts({ ...params, category: slug || '', country }).then((result) => {
      const list = Array.isArray(result) ? result : result.items || result.products || [];
      if (!active) return;
      setProducts(list);
      setTotal(result.total ?? list.length);
      setPages(result.pages ?? Math.max(1, Math.ceil((result.total ?? list.length) / 12)));
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [country, params, slug]);

  const changeFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (!value) next.delete(key);
    else next.set(key, value);
    if (key !== 'page') next.delete('page');
    setSearchParams(next);
  };
  const clearFilters = () => setSearchParams(params.q ? { q: params.q } : {});

  return (
    <Container className="py-10">
      <SectionTitle description={category ? `${category.subcategories.join(' · ')} — curated pieces chosen with care.` : 'A considered collection of finds sourced from around the world.'} eyebrow="Discover the collection" title={heading} />
      <div className="grid gap-7 lg:grid-cols-[240px_1fr]">
        <FilterSidebar onChange={changeFilter} onClear={clearFilters} onClose={() => setFiltersOpen(false)} open={filtersOpen} params={{ ...params, category: slug }} />
        <section>
          <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_auto_auto] sm:items-center">
            <Input aria-label="Search catalogue" id="catalog-search" onChange={(event) => changeFilter('q', event.target.value)} placeholder="Search products..." value={params.q || ''} />
            <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-white/15 px-4 text-sm lg:hidden" onClick={() => setFiltersOpen(true)} type="button"><FiSliders /> Filters</button>
            <SortDropdown onChange={(value) => changeFilter('sort', value === 'featured' ? '' : value)} value={params.sort || 'featured'} />
          </div>
          <p aria-live="polite" className="mb-5 text-xs text-muted">{loading ? 'Finding your pieces…' : `${total} ${total === 1 ? 'piece' : 'pieces'} to discover`}</p>
          <ProductGrid loading={loading} products={products} />
          <Pagination onChange={(page) => changeFilter('page', String(page))} page={Math.max(1, Number(params.page) || 1)} pages={pages} />
        </section>
      </div>
    </Container>
  );
}