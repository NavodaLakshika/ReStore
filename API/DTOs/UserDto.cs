namespace API.DTOs
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }

        public BasketDto Basket { get; set; }
    }
}
