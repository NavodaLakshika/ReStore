import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
  setPageNumber,
  setProductParams,
} from "./catalogSlice";
import {
  Box,
  Paper,
  Typography,
  Divider,
  useTheme,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import ProductList from "./ProductList";
import LoadingComponent from "../../app/layout/LoadingComponent";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/api/components/RadioButtonGroup";
import CheckboxButtons from "../../app/api/components/Checkbox.Buttons";
import AppPagination from "../../app/api/components/AppPagination";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price: High to Low" },
  { value: "priceAsc", label: "Price: Low to High" },
];

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const {
    productsLoaded,
    status,
    filtersLoaded,
    brands,
    types,
    productParams,
    metaData,
  } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [productsLoaded, filtersLoaded, dispatch]);

  if (!filtersLoaded) 
    return <LoadingComponent message="Loading Products..." />;
  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        px: { xs: 1, sm: 3 },
        py: 3,
        gap: { xs: 2, sm: 4 },
      }}
    >
      {/* Sidebar Filters */}
      <Box
        sx={{
          display: { xs: mobileFiltersOpen ? "block" : "none", sm: "block" },
          width: { xs: "100%", sm: 280 },
        }}
      >
        <Paper
          elevation={1}
          sx={{
            p: 3,
            borderRadius: 2,
            bgcolor: theme.palette.background.paper,
            position: { sm: "sticky" },
            top: 24,
            maxHeight: "85vh",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Filters</Typography>
            {mobileFiltersOpen && (
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: "pointer" }}
                onClick={() => setMobileFiltersOpen(false)}
              >
                Close
              </Typography>
            )}
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Sort Options */}
          <RadioButtonGroup
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={(e) =>
              dispatch(setProductParams({ orderBy: e.target.value }))
            }
          />

          {/* Search */}
          <ProductSearch />

          <Divider sx={{ my: 3 }} />
          {/* Type Filter */}
          <Typography variant="subtitle2" gutterBottom>
            Types
          </Typography>
          <CheckboxButtons
            items={types}
            checked={productParams.types ?? []}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ types: items }))
            }
          />

          {/* Brand Filter */}
          <Typography variant="subtitle2" gutterBottom>
            Brands
          </Typography>
          <CheckboxButtons
            items={brands}
            checked={productParams.brands ?? []}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ brands: items }))
            }
          />

          <Divider sx={{ my: 3 }} />

          
        </Paper>
      </Box>

      {/* Main Product Section */}
      <Box flex={1} sx={{ pb: 6 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            mb: 2,
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Showing {products.length} products
          </Typography>

          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, newMode) => newMode && setViewMode(newMode)}
            size="small"
          >
            <ToggleButton value="grid" aria-label="grid view">
              <ViewModuleIcon />
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <ViewListIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <ProductList products={products} viewMode={viewMode} />

        <Box sx={{ mt: 4 }}>
          {metaData &&
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          />}
        </Box>
      </Box>
    </Box>
  );
}
