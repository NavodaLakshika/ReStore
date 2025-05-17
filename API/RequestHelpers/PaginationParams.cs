namespace API.RequestHelpers
{
    public class PaginationParams
    {
        private const int MaxPageSize = 50;

        public int PageNumber { get; set; } = 1;

        private int _pagesize = 8;

        public int PageSize
        {
            get => _pagesize;
            set => _pagesize = value > MaxPageSize ? MaxPageSize : value;
        }
    }
}