import { Box, Pagination, Typography } from "@mui/material";
import { MetaData } from "../../models/pagination";

interface Props{
    metaData: MetaData;
    onPageChange: (page: number) => void;
}

export default function AppPagination({metaData, onPageChange}: Props){
    const {currentPage, totalCount, totalPages, pageSize} = metaData;
    return(
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Typography>
                Displaying {(currentPage-1) * pageSize + 1}-
                {currentPage * pageSize > totalCount ? totalCount: currentPage*pageSize} of {totalCount} items
                </Typography> 
                  <Pagination  size ='large' count={totalPages} page={currentPage} color="primary" 
                  onChange={(e, page) => onPageChange(page)} />
                </Box>
    )
}