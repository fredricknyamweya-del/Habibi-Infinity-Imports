export function localizedCopy(country, english, swahili) {
  return country === 'TZ' ? swahili : english;
}
