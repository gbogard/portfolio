import './src/assets/icons/style.css';

const scroll = () => {
  window.scroll(0, 0);
  window.dispatchEvent(new Event('scroll'))
}

export const onRouteUpdate = ({ location, prevLocation }) => {
  setTimeout(scroll, 50)
}
