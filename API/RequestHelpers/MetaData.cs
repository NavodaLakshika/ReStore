namespace API.RequestHelpers
{
    public class MetaData
    {
        public int CurrenPage { get; set; }

        public int TotalPage { get; set; }

        public int PageSize { get; set; }

        public int TotalCount { get; set; }
        public int TotalPages { get; internal set; }
        public int CurrentPage { get; internal set; }
    }
}