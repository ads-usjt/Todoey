/**
 * Date ISO format string and milliseconds converter
 * @author Lucas Souza <lucasouliveira@gmail.com>
 */
export default {
  /**
   * @param  date receive the milliseconds since 01/01/1970 and convert to a string in the ISO format (yyyy-MM-dd)
   */
  toDateISOString : (date: number | string): string => new Date(Number(date)).toISOString().split('T')[0],

  /**
   * @param  date receive a string in the ISO format (yyyy-MM-dd) and convert to the milliseconds since 01/01/1970
   */
  toMilliseconds(date: string): number {
    let [ year , month, day ] = date.split('-').map( string => Number(string) );

    return new Date( year, --month , day ).getTime();
  },

  /**
   * @param  date receive a string in the ISO format (yyyy-MM-dd) or the milliseconds since 01/01/1970 and convert to Date
   */
  toDate: (date: number | string): Date => new Date(date),
};
