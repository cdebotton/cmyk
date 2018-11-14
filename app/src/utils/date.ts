import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import format from 'date-fns/format';
import isValid from 'date-fns/is_valid';
import parse from 'date-fns/parse';

export function getFormattedDate(date: string, fmt: string = 'MMMM DD, YYYY') {
  const parsed = parse(date);
  if (!isValid(parsed)) {
    return null;
  }
  return format(parsed, fmt);
}

export function getTimeAgo(date: string | null) {
  if (date == null) {
    return 'Never';
  }

  const parsed = parse(date);

  return distanceInWordsToNow(parsed) + ' ago';
}
