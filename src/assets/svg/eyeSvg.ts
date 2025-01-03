export default (
  color?: string,
) => `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<g clip-path="url(#clip0_4098_2838)">
  <path d="M0.833252 9.99999C0.833252 9.99999 4.16658 3.33333 9.99992 3.33333C15.8333 3.33333 19.1666 9.99999 19.1666 9.99999C19.1666 9.99999 15.8333 16.6667 9.99992 16.6667C4.16658 16.6667 0.833252 9.99999 0.833252 9.99999Z" stroke="${color || '#5F5E5E'
  }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="${color || '#5F5E5E'
  }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
  <clipPath id="clip0_4098_2838">
    <rect width="20" height="20" fill="white"/>
  </clipPath>
</defs>
</svg>`;
