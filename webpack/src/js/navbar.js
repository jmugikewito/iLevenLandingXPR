/**
 * Navbar interaction
 */
const navigation = document.querySelector(".main-nav");

if (navigation) {
  const toggler = navigation.querySelector(".navbar-toggler");
  const navTop = navigation.offsetTop + navigation.offsetHeight;

  const handleScroll = () => {
    if (window.scrollY >= navTop) {
      navigation.classList.add("navbar-sticky");
    } else {
      navigation.classList.remove("navbar-sticky");
    }
  };

  // navbar toggler, for mobile interaction
  toggler.addEventListener("click", evt => {
    navigation.classList.toggle("navbar-expanded");
  });

  // windows scroll event, toggle between sticky and non-sticky navbar
  window.addEventListener("scroll", handleScroll);

  // trigger the scroll event when the page loads
  handleScroll();
}
