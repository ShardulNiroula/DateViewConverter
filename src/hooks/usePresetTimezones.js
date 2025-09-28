import { useCallback } from 'react';
import moment from 'moment-timezone';

const PRESET_TIMEZONES = [
  {
    value: 'Asia/Kabul',
    country: 'Afghanistan',
    city: 'Kabul',
    region: 'Asia',
    gmtLabel: 'UTC+04:30',
    offsetMinutes: 270,
    description: 'Afghanistan Time used nationwide, anchored in Kabul.',
    keywords: ['afghanistan', 'aft', 'kabul']
  },
  {
    value: 'Europe/Tirane',
    country: 'Albania',
    city: 'Tirana',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time observed throughout Albania.',
    keywords: ['albania', 'tirana', 'cet']
  },
  {
    value: 'Africa/Algiers',
    country: 'Algeria',
    city: 'Algiers',
    region: 'Africa',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time used nationwide in Algeria.',
    keywords: ['algeria', 'algiers', 'cet']
  },
  {
    value: 'Europe/Andorra',
    country: 'Andorra',
    city: 'Andorra la Vella',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Andorra follows Central European Time.',
    keywords: ['andorra', 'andorra la vella', 'cet']
  },
  {
    value: 'Africa/Luanda',
    country: 'Angola',
    city: 'Luanda',
    region: 'Africa',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'West Africa Time serving Angola and its capital Luanda.',
    keywords: ['angola', 'luanda', 'wat']
  },
  {
    value: 'America/Antigua',
    country: 'Antigua and Barbuda',
    city: "St. John's",
    region: 'North America',
    gmtLabel: 'UTC-04:00',
    offsetMinutes: -240,
    description: 'Atlantic Standard Time observed across Antigua and Barbuda.',
    keywords: ['antigua', 'barbuda', 'ast']
  },
  {
    value: 'America/Argentina/Buenos_Aires',
    country: 'Argentina',
    city: 'Buenos Aires',
    region: 'South America',
    gmtLabel: 'UTC-03:00',
    offsetMinutes: -180,
    description: 'Argentina Time covering Buenos Aires and most of the country.',
    keywords: ['argentina', 'buenos aires', 'art']
  },
  {
    value: 'Asia/Yerevan',
    country: 'Armenia',
    city: 'Yerevan',
    region: 'Asia',
    gmtLabel: 'UTC+04:00',
    offsetMinutes: 240,
    description: 'Armenia Time observed nationwide including Yerevan.',
    keywords: ['armenia', 'yerevan', 'amt']
  },
  {
    value: 'Australia/Sydney',
    country: 'Australia',
    city: 'Sydney',
    region: 'Oceania',
    gmtLabel: 'UTC+10:00',
    offsetMinutes: 600,
    description: 'Australian Eastern Time used in Sydney with daylight saving in summer.',
    keywords: ['australia', 'sydney', 'aet']
  },
  {
    value: 'Australia/Brisbane',
    country: 'Australia',
    city: 'Brisbane',
    region: 'Oceania',
    gmtLabel: 'UTC+10:00',
    offsetMinutes: 600,
    description: 'Australian Eastern Time without daylight saving covering Queensland.',
    keywords: ['australia', 'brisbane', 'aest']
  },
  {
    value: 'Australia/Adelaide',
    country: 'Australia',
    city: 'Adelaide',
    region: 'Oceania',
    gmtLabel: 'UTC+09:30',
    offsetMinutes: 570,
    description: 'Australian Central Time with daylight saving around Adelaide and South Australia.',
    keywords: ['australia', 'adelaide', 'acst']
  },
  {
    value: 'Australia/Darwin',
    country: 'Australia',
    city: 'Darwin',
    region: 'Oceania',
    gmtLabel: 'UTC+09:30',
    offsetMinutes: 570,
    description: 'Australian Central Time without daylight saving covering the Northern Territory.',
    keywords: ['australia', 'darwin', 'acst']
  },
  {
    value: 'Australia/Perth',
    country: 'Australia',
    city: 'Perth',
    region: 'Oceania',
    gmtLabel: 'UTC+08:00',
    offsetMinutes: 480,
    description: 'Australian Western Time used in Perth and Western Australia.',
    keywords: ['australia', 'perth', 'awst']
  },
  {
    value: 'Australia/Hobart',
    country: 'Australia',
    city: 'Hobart',
    region: 'Oceania',
    gmtLabel: 'UTC+10:00',
    offsetMinutes: 600,
    description: 'Australian Eastern Time with daylight saving on Tasmania.',
    keywords: ['australia', 'hobart', 'aedt']
  },
  {
    value: 'Europe/Vienna',
    country: 'Austria',
    city: 'Vienna',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time covering Austria and Vienna.',
    keywords: ['austria', 'vienna', 'cet']
  },
  {
    value: 'Asia/Baku',
    country: 'Azerbaijan',
    city: 'Baku',
    region: 'Asia',
    gmtLabel: 'UTC+04:00',
    offsetMinutes: 240,
    description: 'Azerbaijan Time observed across the country.',
    keywords: ['azerbaijan', 'baku', 'azt']
  },
  {
    value: 'America/Nassau',
    country: 'Bahamas',
    city: 'Nassau',
    region: 'North America',
    gmtLabel: 'UTC-05:00',
    offsetMinutes: -300,
    description: 'Eastern Time applied in the Bahamas including Nassau.',
    keywords: ['bahamas', 'nassau', 'est']
  },
  {
    value: 'Asia/Bahrain',
    country: 'Bahrain',
    city: 'Manama',
    region: 'Asia',
    gmtLabel: 'UTC+03:00',
    offsetMinutes: 180,
    description: 'Arabia Standard Time observed in Bahrain.',
    keywords: ['bahrain', 'manama', 'ast']
  },
  {
    value: 'Asia/Dhaka',
    country: 'Bangladesh',
    city: 'Dhaka',
    region: 'Asia',
    gmtLabel: 'UTC+06:00',
    offsetMinutes: 360,
    description: 'Bangladesh Standard Time covering Dhaka and the whole country.',
    keywords: ['bangladesh', 'dhaka', 'bst']
  },
  {
    value: 'America/Barbados',
    country: 'Barbados',
    city: 'Bridgetown',
    region: 'North America',
    gmtLabel: 'UTC-04:00',
    offsetMinutes: -240,
    description: 'Atlantic Standard Time used in Barbados including Bridgetown.',
    keywords: ['barbados', 'bridgetown', 'ast']
  },
  {
    value: 'Europe/Minsk',
    country: 'Belarus',
    city: 'Minsk',
    region: 'Europe',
    gmtLabel: 'UTC+03:00',
    offsetMinutes: 180,
    description: 'Moscow Standard Time observed year-round in Belarus.',
    keywords: ['belarus', 'minsk', 'msk']
  },
  {
    value: 'Europe/Brussels',
    country: 'Belgium',
    city: 'Brussels',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time covering Belgium and Brussels.',
    keywords: ['belgium', 'brussels', 'cet']
  },
  {
    value: 'America/Belize',
    country: 'Belize',
    city: 'Belize City',
    region: 'North America',
    gmtLabel: 'UTC-06:00',
    offsetMinutes: -360,
    description: 'Central Standard Time observed in Belize year-round.',
    keywords: ['belize', 'belize city', 'cst']
  },
  {
    value: 'Africa/Porto-Novo',
    country: 'Benin',
    city: 'Porto-Novo',
    region: 'Africa',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'West Africa Time covering Benin.',
    keywords: ['benin', 'porto-novo', 'wat']
  },
  {
    value: 'Asia/Thimphu',
    country: 'Bhutan',
    city: 'Thimphu',
    region: 'Asia',
    gmtLabel: 'UTC+06:00',
    offsetMinutes: 360,
    description: 'Bhutan Time used nationwide.',
    keywords: ['bhutan', 'thimphu', 'btt']
  },
  {
    value: 'America/La_Paz',
    country: 'Bolivia',
    city: 'La Paz',
    region: 'South America',
    gmtLabel: 'UTC-04:00',
    offsetMinutes: -240,
    description: 'Bolivia Time covering La Paz and the entire country.',
    keywords: ['bolivia', 'la paz', 'bot']
  },
  {
    value: 'Europe/Sarajevo',
    country: 'Bosnia and Herzegovina',
    city: 'Sarajevo',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time observed throughout Bosnia and Herzegovina.',
    keywords: ['bosnia', 'herzegovina', 'sarajevo', 'cet']
  },
  {
    value: 'Africa/Gaborone',
    country: 'Botswana',
    city: 'Gaborone',
    region: 'Africa',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Central Africa Time used across Botswana.',
    keywords: ['botswana', 'gaborone', 'cat']
  },
  {
    value: 'America/Sao_Paulo',
    country: 'Brazil',
    city: 'São Paulo',
    region: 'South America',
    gmtLabel: 'UTC-03:00',
    offsetMinutes: -180,
    description: 'Brasília Time covering São Paulo and most of eastern Brazil.',
    keywords: ['brazil', 'sao paulo', 'brt']
  },
  {
    value: 'America/Manaus',
    country: 'Brazil',
    city: 'Manaus',
    region: 'South America',
    gmtLabel: 'UTC-04:00',
    offsetMinutes: -240,
    description: 'Amazon Time used in Manaus and northwestern Brazil.',
    keywords: ['brazil', 'manaus', 'amt']
  },
  {
    value: 'America/Cuiaba',
    country: 'Brazil',
    city: 'Cuiabá',
    region: 'South America',
    gmtLabel: 'UTC-04:00',
    offsetMinutes: -240,
    description: 'Amazon Time observed around Mato Grosso and Cuiabá.',
    keywords: ['brazil', 'cuiaba', 'amt']
  },
  {
    value: 'America/Rio_Branco',
    country: 'Brazil',
    city: 'Rio Branco',
    region: 'South America',
    gmtLabel: 'UTC-05:00',
    offsetMinutes: -300,
    description: 'Acre Time covering the far western state of Acre.',
    keywords: ['brazil', 'rio branco', 'act']
  },
  {
    value: 'America/Noronha',
    country: 'Brazil',
    city: 'Fernando de Noronha',
    region: 'South America',
    gmtLabel: 'UTC-02:00',
    offsetMinutes: -120,
    description: 'Fernando de Noronha Time used on Brazil’s Atlantic islands.',
    keywords: ['brazil', 'fernando de noronha', 'fnt']
  },
  {
    value: 'Asia/Brunei',
    country: 'Brunei',
    city: 'Bandar Seri Begawan',
    region: 'Asia',
    gmtLabel: 'UTC+08:00',
    offsetMinutes: 480,
    description: 'Brunei Darussalam Time covering the entire country.',
    keywords: ['brunei', 'bandar seri begawan', 'bdt']
  },
  {
    value: 'Europe/Sofia',
    country: 'Bulgaria',
    city: 'Sofia',
    region: 'Europe',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Eastern European Time used across Bulgaria.',
    keywords: ['bulgaria', 'sofia', 'eet']
  },
  {
    value: 'Africa/Ouagadougou',
    country: 'Burkina Faso',
    city: 'Ouagadougou',
    region: 'Africa',
    gmtLabel: 'UTC+00:00',
    offsetMinutes: 0,
    description: 'Greenwich Mean Time used in Burkina Faso year-round.',
    keywords: ['burkina faso', 'ouagadougou', 'gmt']
  },
  {
    value: 'Africa/Bujumbura',
    country: 'Burundi',
    city: 'Gitega',
    region: 'Africa',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Central Africa Time covering Burundi including Gitega.',
    keywords: ['burundi', 'gitega', 'cat']
  },
  {
    value: 'Atlantic/Cape_Verde',
    country: 'Cabo Verde',
    city: 'Praia',
    region: 'Africa',
    gmtLabel: 'UTC-01:00',
    offsetMinutes: -60,
    description: 'Cabo Verde Time used on the islands including Praia.',
    keywords: ['cabo verde', 'cape verde', 'praia', 'cvst']
  },
  {
    value: 'Asia/Phnom_Penh',
    country: 'Cambodia',
    city: 'Phnom Penh',
    region: 'Asia',
    gmtLabel: 'UTC+07:00',
    offsetMinutes: 420,
    description: 'Indochina Time observed throughout Cambodia.',
    keywords: ['cambodia', 'phnom penh', 'ict']
  },
  {
    value: 'Africa/Douala',
    country: 'Cameroon',
    city: 'Yaoundé',
    region: 'Africa',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'West Africa Time covering Cameroon and its capital Yaoundé.',
    keywords: ['cameroon', 'yaounde', 'wat']
  },
  {
    value: 'America/St_Johns',
    country: 'Canada',
    city: "St. John's",
    region: 'North America',
    gmtLabel: 'UTC-03:30',
    offsetMinutes: -210,
    description: 'Newfoundland Time used on the island of Newfoundland.',
    keywords: ['canada', 'newfoundland', "st. john's", 'nt']
  },
  {
    value: 'America/Halifax',
    country: 'Canada',
    city: 'Halifax',
    region: 'North America',
    gmtLabel: 'UTC-04:00',
    offsetMinutes: -240,
    description: 'Atlantic Time observed in Atlantic Canada including Halifax.',
    keywords: ['canada', 'halifax', 'ast']
  },
  {
    value: 'America/Toronto',
    country: 'Canada',
    city: 'Toronto',
    region: 'North America',
    gmtLabel: 'UTC-05:00',
    offsetMinutes: -300,
    description: 'Eastern Time covering Ontario and Québec population centres.',
    keywords: ['canada', 'toronto', 'est']
  },
  {
    value: 'America/Winnipeg',
    country: 'Canada',
    city: 'Winnipeg',
    region: 'North America',
    gmtLabel: 'UTC-06:00',
    offsetMinutes: -360,
    description: 'Central Time used in Manitoba and central provinces.',
    keywords: ['canada', 'winnipeg', 'cst']
  },
  {
    value: 'America/Edmonton',
    country: 'Canada',
    city: 'Edmonton',
    region: 'North America',
    gmtLabel: 'UTC-07:00',
    offsetMinutes: -420,
    description: 'Mountain Time covering Alberta including Edmonton.',
    keywords: ['canada', 'edmonton', 'mst']
  },
  {
    value: 'America/Vancouver',
    country: 'Canada',
    city: 'Vancouver',
    region: 'North America',
    gmtLabel: 'UTC-08:00',
    offsetMinutes: -480,
    description: 'Pacific Time observed in British Columbia and Vancouver.',
    keywords: ['canada', 'vancouver', 'pst']
  },
  {
    value: 'Africa/Bangui',
    country: 'Central African Republic',
    city: 'Bangui',
    region: 'Africa',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'West Africa Time covering the Central African Republic.',
    keywords: ['central african republic', 'bangui', 'wat']
  },
  {
    value: 'Africa/Ndjamena',
    country: 'Chad',
    city: "N'Djamena",
    region: 'Africa',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'West Africa Time observed in Chad including N’Djamena.',
    keywords: ['chad', "n'djamena", 'wat']
  },
  {
    value: 'America/Santiago',
    country: 'Chile',
    city: 'Santiago',
    region: 'South America',
    gmtLabel: 'UTC-04:00',
    offsetMinutes: -240,
    description: 'Chile Standard Time covering the mainland including Santiago.',
    keywords: ['chile', 'santiago', 'clt']
  },
  {
    value: 'America/Punta_Arenas',
    country: 'Chile',
    city: 'Punta Arenas',
    region: 'South America',
    gmtLabel: 'UTC-03:00',
    offsetMinutes: -180,
    description: 'Magallanes Time used year-round in southern Chile.',
    keywords: ['chile', 'punta arenas', 'clt', 'magallanes']
  },
  {
    value: 'Pacific/Easter',
    country: 'Chile',
    city: 'Hanga Roa',
    region: 'Oceania',
    gmtLabel: 'UTC-06:00',
    offsetMinutes: -360,
    description: 'Easter Island Time covering Rapa Nui and nearby islands.',
    keywords: ['chile', 'rapa nui', 'easter island']
  },
  {
    value: 'Asia/Shanghai',
    country: 'China',
    city: 'Beijing',
    region: 'Asia',
    gmtLabel: 'UTC+08:00',
    offsetMinutes: 480,
    description: 'China Standard Time shared nationwide despite the wide geography.',
    keywords: ['china', 'beijing', 'cst']
  },
  {
    value: 'America/Bogota',
    country: 'Colombia',
    city: 'Bogotá',
    region: 'South America',
    gmtLabel: 'UTC-05:00',
    offsetMinutes: -300,
    description: 'Colombia Time covering Bogotá and the entire country.',
    keywords: ['colombia', 'bogota', 'cot']
  },
  {
    value: 'Indian/Comoro',
    country: 'Comoros',
    city: 'Moroni',
    region: 'Africa',
    gmtLabel: 'UTC+03:00',
    offsetMinutes: 180,
    description: 'East Africa Time observed across the Comoros islands.',
    keywords: ['comoros', 'moroni', 'eat']
  },
  {
    value: 'America/Costa_Rica',
    country: 'Costa Rica',
    city: 'San José',
    region: 'North America',
    gmtLabel: 'UTC-06:00',
    offsetMinutes: -360,
    description: 'Central Standard Time used across Costa Rica.',
    keywords: ['costa rica', 'san jose', 'cst']
  },
  {
    value: 'Africa/Abidjan',
    country: "Côte d'Ivoire",
    city: 'Abidjan',
    region: 'Africa',
    gmtLabel: 'UTC+00:00',
    offsetMinutes: 0,
    description: 'Greenwich Mean Time covering Côte d’Ivoire.',
    keywords: ["côte d'ivoire", 'ivory coast', 'abidjan', 'gmt']
  },
  {
    value: 'Europe/Zagreb',
    country: 'Croatia',
    city: 'Zagreb',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time covering Croatia.',
    keywords: ['croatia', 'zagreb', 'cet']
  },
  {
    value: 'America/Havana',
    country: 'Cuba',
    city: 'Havana',
    region: 'North America',
    gmtLabel: 'UTC-05:00',
    offsetMinutes: -300,
    description: 'Cuba Standard Time observed throughout the island.',
    keywords: ['cuba', 'havana', 'cst']
  },
  {
    value: 'Asia/Nicosia',
    country: 'Cyprus',
    city: 'Nicosia',
    region: 'Asia',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Eastern European Time used across the Republic of Cyprus.',
    keywords: ['cyprus', 'nicosia', 'eet']
  },
  {
    value: 'Europe/Prague',
    country: 'Czechia',
    city: 'Prague',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time covering Czechia including Prague.',
    keywords: ['czechia', 'prague', 'cet']
  },
  {
    value: 'Africa/Kinshasa',
    country: 'Democratic Republic of the Congo',
    city: 'Kinshasa',
    region: 'Africa',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'West Africa Time covering western DR Congo including Kinshasa.',
    keywords: ['democratic republic of the congo', 'kinshasa', 'wat', 'drc']
  },
  {
    value: 'Africa/Lubumbashi',
    country: 'Democratic Republic of the Congo',
    city: 'Lubumbashi',
    region: 'Africa',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Central Africa Time used in eastern DR Congo including Lubumbashi.',
    keywords: ['democratic republic of the congo', 'lubumbashi', 'cat', 'drc']
  },
  {
    value: 'Europe/Copenhagen',
    country: 'Denmark',
    city: 'Copenhagen',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time covering mainland Denmark.',
    keywords: ['denmark', 'copenhagen', 'cet']
  },
  {
    value: 'Africa/Djibouti',
    country: 'Djibouti',
    city: 'Djibouti City',
    region: 'Africa',
    gmtLabel: 'UTC+03:00',
    offsetMinutes: 180,
    description: 'East Africa Time used across Djibouti.',
    keywords: ['djibouti', 'djibouti city', 'eat']
  },
  {
    value: 'America/Dominica',
    country: 'Dominica',
    city: 'Roseau',
    region: 'North America',
    gmtLabel: 'UTC-04:00',
    offsetMinutes: -240,
    description: 'Atlantic Standard Time covering the island of Dominica.',
    keywords: ['dominica', 'roseau', 'ast']
  },
  {
    value: 'America/Santo_Domingo',
    country: 'Dominican Republic',
    city: 'Santo Domingo',
    region: 'North America',
    gmtLabel: 'UTC-04:00',
    offsetMinutes: -240,
    description: 'Atlantic Standard Time used throughout the Dominican Republic.',
    keywords: ['dominican republic', 'santo domingo', 'ast']
  },
  {
    value: 'America/Guayaquil',
    country: 'Ecuador',
    city: 'Quito',
    region: 'South America',
    gmtLabel: 'UTC-05:00',
    offsetMinutes: -300,
    description: 'Ecuador Time covering the mainland including Quito and Guayaquil.',
    keywords: ['ecuador', 'quito', 'ect']
  },
  {
    value: 'Pacific/Galapagos',
    country: 'Ecuador',
    city: 'Puerto Baquerizo Moreno',
    region: 'South America',
    gmtLabel: 'UTC-06:00',
    offsetMinutes: -360,
    description: 'Galápagos Time used on the Galápagos Islands.',
    keywords: ['ecuador', 'galapagos', 'ect']
  },
  {
    value: 'Africa/Cairo',
    country: 'Egypt',
    city: 'Cairo',
    region: 'Africa',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Eastern European Time observed across Egypt.',
    keywords: ['egypt', 'cairo', 'eat', 'eet']
  },
  {
    value: 'America/El_Salvador',
    country: 'El Salvador',
    city: 'San Salvador',
    region: 'North America',
    gmtLabel: 'UTC-06:00',
    offsetMinutes: -360,
    description: 'Central Standard Time observed year-round in El Salvador.',
    keywords: ['el salvador', 'san salvador', 'cst']
  },
  {
    value: 'Africa/Malabo',
    country: 'Equatorial Guinea',
    city: 'Malabo',
    region: 'Africa',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'West Africa Time covering Equatorial Guinea.',
    keywords: ['equatorial guinea', 'malabo', 'wat']
  },
  {
    value: 'Africa/Asmara',
    country: 'Eritrea',
    city: 'Asmara',
    region: 'Africa',
    gmtLabel: 'UTC+03:00',
    offsetMinutes: 180,
    description: 'East Africa Time used across Eritrea.',
    keywords: ['eritrea', 'asmara', 'eat']
  },
  {
    value: 'Europe/Tallinn',
    country: 'Estonia',
    city: 'Tallinn',
    region: 'Europe',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Eastern European Time covering Estonia.',
    keywords: ['estonia', 'tallinn', 'eet']
  },
  {
    value: 'Africa/Mbabane',
    country: 'Eswatini',
    city: 'Mbabane',
    region: 'Africa',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Central Africa Time observed across Eswatini (Swaziland).',
    keywords: ['eswatini', 'swaziland', 'mbabane', 'cat']
  },
  {
    value: 'Africa/Addis_Ababa',
    country: 'Ethiopia',
    city: 'Addis Ababa',
    region: 'Africa',
    gmtLabel: 'UTC+03:00',
    offsetMinutes: 180,
    description: 'East Africa Time used across Ethiopia including Addis Ababa.',
    keywords: ['ethiopia', 'addis ababa', 'eat']
  },
  {
    value: 'Pacific/Fiji',
    country: 'Fiji',
    city: 'Suva',
    region: 'Oceania',
    gmtLabel: 'UTC+12:00',
    offsetMinutes: 720,
    description: 'Fiji Time covering the islands including Suva.',
    keywords: ['fiji', 'suva', 'fjt']
  },
  {
    value: 'Europe/Helsinki',
    country: 'Finland',
    city: 'Helsinki',
    region: 'Europe',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Eastern European Time used in Finland.',
    keywords: ['finland', 'helsinki', 'eet']
  },
  {
    value: 'Europe/Paris',
    country: 'France',
    city: 'Paris',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time covering metropolitan France.',
    keywords: ['france', 'paris', 'cet']
  },
  {
    value: 'Africa/Libreville',
    country: 'Gabon',
    city: 'Libreville',
    region: 'Africa',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'West Africa Time used across Gabon.',
    keywords: ['gabon', 'libreville', 'wat']
  },
  {
    value: 'Africa/Banjul',
    country: 'Gambia',
    city: 'Banjul',
    region: 'Africa',
    gmtLabel: 'UTC+00:00',
    offsetMinutes: 0,
    description: 'Greenwich Mean Time covering the Gambia.',
    keywords: ['gambia', 'banjul', 'gmt']
  },
  {
    value: 'Asia/Tbilisi',
    country: 'Georgia',
    city: 'Tbilisi',
    region: 'Asia',
    gmtLabel: 'UTC+04:00',
    offsetMinutes: 240,
    description: 'Georgia Standard Time observed nationwide.',
    keywords: ['georgia', 'tbilisi', 'get']
  },
  {
    value: 'Europe/Berlin',
    country: 'Germany',
    city: 'Berlin',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time covering Germany.',
    keywords: ['germany', 'berlin', 'cet']
  },
  {
    value: 'Africa/Accra',
    country: 'Ghana',
    city: 'Accra',
    region: 'Africa',
    gmtLabel: 'UTC+00:00',
    offsetMinutes: 0,
    description: 'Greenwich Mean Time observed across Ghana.',
    keywords: ['ghana', 'accra', 'gmt']
  },
  {
    value: 'Europe/Athens',
    country: 'Greece',
    city: 'Athens',
    region: 'Europe',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Eastern European Time covering Greece.',
    keywords: ['greece', 'athens', 'eet']
  },
  {
    value: 'America/Grenada',
    country: 'Grenada',
    city: "St. George's",
    region: 'North America',
    gmtLabel: 'UTC-04:00',
    offsetMinutes: -240,
    description: 'Atlantic Standard Time used throughout Grenada.',
    keywords: ['grenada', "st. george's", 'ast']
  },
  {
    value: 'America/Guatemala',
    country: 'Guatemala',
    city: 'Guatemala City',
    region: 'North America',
    gmtLabel: 'UTC-06:00',
    offsetMinutes: -360,
    description: 'Central Standard Time covering Guatemala.',
    keywords: ['guatemala', 'guatemala city', 'cst']
  },
  {
    value: 'Africa/Conakry',
    country: 'Guinea',
    city: 'Conakry',
    region: 'Africa',
    gmtLabel: 'UTC+00:00',
    offsetMinutes: 0,
    description: 'Greenwich Mean Time observed across Guinea.',
    keywords: ['guinea', 'conakry', 'gmt']
  },
  {
    value: 'Africa/Bissau',
    country: 'Guinea-Bissau',
    city: 'Bissau',
    region: 'Africa',
    gmtLabel: 'UTC+00:00',
    offsetMinutes: 0,
    description: 'Greenwich Mean Time covering Guinea-Bissau.',
    keywords: ['guinea-bissau', 'bissau', 'gmt']
  },
  {
    value: 'America/Guyana',
    country: 'Guyana',
    city: 'Georgetown',
    region: 'South America',
    gmtLabel: 'UTC-04:00',
    offsetMinutes: -240,
    description: 'Guyana Time observed nationwide including Georgetown.',
    keywords: ['guyana', 'georgetown', 'gyt']
  },
  {
    value: 'America/Port-au-Prince',
    country: 'Haiti',
    city: 'Port-au-Prince',
    region: 'North America',
    gmtLabel: 'UTC-05:00',
    offsetMinutes: -300,
    description: 'Eastern Time applied across Haiti.',
    keywords: ['haiti', 'port-au-prince', 'est']
  },
  {
    value: 'America/Tegucigalpa',
    country: 'Honduras',
    city: 'Tegucigalpa',
    region: 'North America',
    gmtLabel: 'UTC-06:00',
    offsetMinutes: -360,
    description: 'Central Standard Time covering Honduras.',
    keywords: ['honduras', 'tegucigalpa', 'cst']
  },
  {
    value: 'Europe/Budapest',
    country: 'Hungary',
    city: 'Budapest',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time observed across Hungary.',
    keywords: ['hungary', 'budapest', 'cet']
  },
  {
    value: 'Atlantic/Reykjavik',
    country: 'Iceland',
    city: 'Reykjavík',
    region: 'Europe',
    gmtLabel: 'UTC+00:00',
    offsetMinutes: 0,
    description: 'Greenwich Mean Time used year-round in Iceland.',
    keywords: ['iceland', 'reykjavik', 'gmt']
  },
  {
    value: 'Asia/Kolkata',
    country: 'India',
    city: 'New Delhi',
    region: 'Asia',
    gmtLabel: 'UTC+05:30',
    offsetMinutes: 330,
    description: 'Indian Standard Time covering the entire country.',
    keywords: ['india', 'new delhi', 'ist']
  },
  {
    value: 'Asia/Jakarta',
    country: 'Indonesia',
    city: 'Jakarta',
    region: 'Asia',
    gmtLabel: 'UTC+07:00',
    offsetMinutes: 420,
    description: 'Western Indonesia Time used on Sumatra and Java including Jakarta.',
    keywords: ['indonesia', 'jakarta', 'wit', 'wib']
  },
  {
    value: 'Asia/Makassar',
    country: 'Indonesia',
    city: 'Makassar',
    region: 'Asia',
    gmtLabel: 'UTC+08:00',
    offsetMinutes: 480,
    description: 'Central Indonesia Time covering Sulawesi and Bali.',
    keywords: ['indonesia', 'makassar', 'wita']
  },
  {
    value: 'Asia/Jayapura',
    country: 'Indonesia',
    city: 'Jayapura',
    region: 'Asia',
    gmtLabel: 'UTC+09:00',
    offsetMinutes: 540,
    description: 'Eastern Indonesia Time used in Papua.',
    keywords: ['indonesia', 'jayapura', 'wit']
  },
  {
    value: 'Asia/Tehran',
    country: 'Iran',
    city: 'Tehran',
    region: 'Asia',
    gmtLabel: 'UTC+03:30',
    offsetMinutes: 210,
    description: 'Iran Standard Time observed nationwide.',
    keywords: ['iran', 'tehran', 'irst']
  },
  {
    value: 'Asia/Baghdad',
    country: 'Iraq',
    city: 'Baghdad',
    region: 'Asia',
    gmtLabel: 'UTC+03:00',
    offsetMinutes: 180,
    description: 'Arabia Standard Time covering Iraq.',
    keywords: ['iraq', 'baghdad', 'ast']
  },
  {
    value: 'Europe/Dublin',
    country: 'Ireland',
    city: 'Dublin',
    region: 'Europe',
    gmtLabel: 'UTC+00:00',
    offsetMinutes: 0,
    description: 'Greenwich Mean Time used in Ireland with summer daylight saving.',
    keywords: ['ireland', 'dublin', 'gmt', 'ist']
  },
  {
    value: 'Asia/Jerusalem',
    country: 'Israel',
    city: 'Jerusalem',
    region: 'Asia',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Israel Standard Time covering Jerusalem and the country.',
    keywords: ['israel', 'jerusalem', 'ist', 'idf']
  },
  {
    value: 'Europe/Rome',
    country: 'Italy',
    city: 'Rome',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time covering Italy.',
    keywords: ['italy', 'rome', 'cet']
  },
  {
    value: 'America/Jamaica',
    country: 'Jamaica',
    city: 'Kingston',
    region: 'North America',
    gmtLabel: 'UTC-05:00',
    offsetMinutes: -300,
    description: 'Jamaica observes Eastern Standard Time year-round.',
    keywords: ['jamaica', 'kingston', 'est']
  },
  {
    value: 'Asia/Tokyo',
    country: 'Japan',
    city: 'Tokyo',
    region: 'Asia',
    gmtLabel: 'UTC+09:00',
    offsetMinutes: 540,
    description: 'Japan Standard Time covering the entire country.',
    keywords: ['japan', 'tokyo', 'jst']
  },
  {
    value: 'Asia/Amman',
    country: 'Jordan',
    city: 'Amman',
    region: 'Asia',
    gmtLabel: 'UTC+03:00',
    offsetMinutes: 180,
    description: 'Jordan Time observed nationwide.',
    keywords: ['jordan', 'amman', 'jot']
  },
  {
    value: 'Asia/Almaty',
    country: 'Kazakhstan',
    city: 'Almaty',
    region: 'Asia',
    gmtLabel: 'UTC+06:00',
    offsetMinutes: 360,
    description: 'Kazakhstan Eastern Time covering Almaty and the southeast.',
    keywords: ['kazakhstan', 'almaty', 'almt']
  },
  {
    value: 'Asia/Aqtobe',
    country: 'Kazakhstan',
    city: 'Aqtobe',
    region: 'Asia',
    gmtLabel: 'UTC+05:00',
    offsetMinutes: 300,
    description: 'Kazakhstan Western Time used around Aqtobe and the west.',
    keywords: ['kazakhstan', 'aqtobe', 'oral', 'aqtt']
  },
  {
    value: 'Africa/Nairobi',
    country: 'Kenya',
    city: 'Nairobi',
    region: 'Africa',
    gmtLabel: 'UTC+03:00',
    offsetMinutes: 180,
    description: 'East Africa Time covering Kenya including Nairobi.',
    keywords: ['kenya', 'nairobi', 'eat']
  },
  {
    value: 'Pacific/Tarawa',
    country: 'Kiribati',
    city: 'Tarawa',
    region: 'Oceania',
    gmtLabel: 'UTC+12:00',
    offsetMinutes: 720,
    description: 'Gilbert Islands Time used in Tarawa and central Kiribati.',
    keywords: ['kiribati', 'tarawa', 'gilt']
  },
  {
    value: 'Pacific/Kanton',
    country: 'Kiribati',
    city: 'Kanton Island',
    region: 'Oceania',
    gmtLabel: 'UTC+13:00',
    offsetMinutes: 780,
    description: 'Phoenix Islands Time covering the sparsely populated central islands.',
    keywords: ['kiribati', 'kanton', 'phoit']
  },
  {
    value: 'Pacific/Kiritimati',
    country: 'Kiribati',
    city: 'Kiritimati',
    region: 'Oceania',
    gmtLabel: 'UTC+14:00',
    offsetMinutes: 840,
    description: 'Line Islands Time used on Kiritimati and eastern Kiribati.',
    keywords: ['kiribati', 'kiritimati', 'leit']
  },
  {
    value: 'Asia/Kuwait',
    country: 'Kuwait',
    city: 'Kuwait City',
    region: 'Asia',
    gmtLabel: 'UTC+03:00',
    offsetMinutes: 180,
    description: 'Arabia Standard Time covering Kuwait.',
    keywords: ['kuwait', 'kuwait city', 'ast']
  },
  {
    value: 'Asia/Bishkek',
    country: 'Kyrgyzstan',
    city: 'Bishkek',
    region: 'Asia',
    gmtLabel: 'UTC+06:00',
    offsetMinutes: 360,
    description: 'Kyrgyzstan Time observed nationwide.',
    keywords: ['kyrgyzstan', 'bishkek', 'kst']
  },
  {
    value: 'Asia/Vientiane',
    country: 'Laos',
    city: 'Vientiane',
    region: 'Asia',
    gmtLabel: 'UTC+07:00',
    offsetMinutes: 420,
    description: 'Indochina Time observed across Laos.',
    keywords: ['laos', 'vientiane', 'ict']
  },
  {
    value: 'Europe/Riga',
    country: 'Latvia',
    city: 'Riga',
    region: 'Europe',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Eastern European Time covering Latvia.',
    keywords: ['latvia', 'riga', 'eet']
  },
  {
    value: 'Asia/Beirut',
    country: 'Lebanon',
    city: 'Beirut',
    region: 'Asia',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Eastern European Time observed in Lebanon.',
    keywords: ['lebanon', 'beirut', 'eet']
  },
  {
    value: 'Africa/Maseru',
    country: 'Lesotho',
    city: 'Maseru',
    region: 'Africa',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'South Africa Standard Time covering Lesotho.',
    keywords: ['lesotho', 'maseru', 'sast']
  },
  {
    value: 'Africa/Monrovia',
    country: 'Liberia',
    city: 'Monrovia',
    region: 'Africa',
    gmtLabel: 'UTC+00:00',
    offsetMinutes: 0,
    description: 'Greenwich Mean Time used in Liberia.',
    keywords: ['liberia', 'monrovia', 'gmt']
  },
  {
    value: 'Africa/Tripoli',
    country: 'Libya',
    city: 'Tripoli',
    region: 'Africa',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Eastern European Time observed across Libya.',
    keywords: ['libya', 'tripoli', 'eet']
  },
  {
    value: 'Europe/Vaduz',
    country: 'Liechtenstein',
    city: 'Vaduz',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time covering Liechtenstein.',
    keywords: ['liechtenstein', 'vaduz', 'cet']
  },
  {
    value: 'Europe/Vilnius',
    country: 'Lithuania',
    city: 'Vilnius',
    region: 'Europe',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Eastern European Time covering Lithuania.',
    keywords: ['lithuania', 'vilnius', 'eet']
  },
  {
    value: 'Europe/Luxembourg',
    country: 'Luxembourg',
    city: 'Luxembourg City',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time observed in Luxembourg.',
    keywords: ['luxembourg', 'luxembourg city', 'cet']
  },
  {
    value: 'Indian/Antananarivo',
    country: 'Madagascar',
    city: 'Antananarivo',
    region: 'Africa',
    gmtLabel: 'UTC+03:00',
    offsetMinutes: 180,
    description: 'East Africa Time covering Madagascar.',
    keywords: ['madagascar', 'antananarivo', 'eat']
  },
  {
    value: 'Africa/Blantyre',
    country: 'Malawi',
    city: 'Lilongwe',
    region: 'Africa',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Central Africa Time observed across Malawi.',
    keywords: ['malawi', 'lilongwe', 'cat']
  },
  {
    value: 'Asia/Kuala_Lumpur',
    country: 'Malaysia',
    city: 'Kuala Lumpur',
    region: 'Asia',
    gmtLabel: 'UTC+08:00',
    offsetMinutes: 480,
    description: 'Malaysia Time covering Peninsular and East Malaysia.',
    keywords: ['malaysia', 'kuala lumpur', 'myt']
  },
  {
    value: 'Indian/Maldives',
    country: 'Maldives',
    city: 'Malé',
    region: 'Asia',
    gmtLabel: 'UTC+05:00',
    offsetMinutes: 300,
    description: 'Maldives Time observed across the archipelago.',
    keywords: ['maldives', 'male', 'mvt']
  },
  {
    value: 'Africa/Bamako',
    country: 'Mali',
    city: 'Bamako',
    region: 'Africa',
    gmtLabel: 'UTC+00:00',
    offsetMinutes: 0,
    description: 'Greenwich Mean Time covering Mali.',
    keywords: ['mali', 'bamako', 'gmt']
  },
  {
    value: 'Europe/Malta',
    country: 'Malta',
    city: 'Valletta',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time used in Malta.',
    keywords: ['malta', 'valletta', 'cet']
  },
  {
    value: 'Pacific/Majuro',
    country: 'Marshall Islands',
    city: 'Majuro',
    region: 'Oceania',
    gmtLabel: 'UTC+12:00',
    offsetMinutes: 720,
    description: 'Marshall Islands Time covering Majuro and eastern atolls.',
    keywords: ['marshall islands', 'majuro', 'mht']
  },
  {
    value: 'Pacific/Kwajalein',
    country: 'Marshall Islands',
    city: 'Kwajalein',
    region: 'Oceania',
    gmtLabel: 'UTC+12:00',
    offsetMinutes: 720,
    description: 'Marshall Islands Time used on Kwajalein Atoll.',
    keywords: ['marshall islands', 'kwajalein', 'mht']
  },
  {
    value: 'Africa/Nouakchott',
    country: 'Mauritania',
    city: 'Nouakchott',
    region: 'Africa',
    gmtLabel: 'UTC+00:00',
    offsetMinutes: 0,
    description: 'Greenwich Mean Time observed in Mauritania.',
    keywords: ['mauritania', 'nouakchott', 'gmt']
  },
  {
    value: 'Indian/Mauritius',
    country: 'Mauritius',
    city: 'Port Louis',
    region: 'Africa',
    gmtLabel: 'UTC+04:00',
    offsetMinutes: 240,
    description: 'Mauritius Time covering Port Louis and the islands.',
    keywords: ['mauritius', 'port louis', 'mut']
  },
  {
    value: 'America/Mexico_City',
    country: 'Mexico',
    city: 'Mexico City',
    region: 'North America',
    gmtLabel: 'UTC-06:00',
    offsetMinutes: -360,
    description: 'Central Standard Time covering the populous heart of Mexico.',
    keywords: ['mexico', 'mexico city', 'cst']
  },
  {
    value: 'America/Monterrey',
    country: 'Mexico',
    city: 'Monterrey',
    region: 'North America',
    gmtLabel: 'UTC-06:00',
    offsetMinutes: -360,
    description: 'Central Time observed in northeastern Mexico.',
    keywords: ['mexico', 'monterrey', 'cst']
  },
  {
    value: 'America/Cancun',
    country: 'Mexico',
    city: 'Cancún',
    region: 'North America',
    gmtLabel: 'UTC-05:00',
    offsetMinutes: -300,
    description: 'Eastern Standard Time covering Quintana Roo and Cancún.',
    keywords: ['mexico', 'cancun', 'est']
  },
  {
    value: 'America/Chihuahua',
    country: 'Mexico',
    city: 'Chihuahua',
    region: 'North America',
    gmtLabel: 'UTC-07:00',
    offsetMinutes: -420,
    description: 'Mountain Standard Time covering northern Mexico interior.',
    keywords: ['mexico', 'chihuahua', 'mst']
  },
  {
    value: 'America/Tijuana',
    country: 'Mexico',
    city: 'Tijuana',
    region: 'North America',
    gmtLabel: 'UTC-08:00',
    offsetMinutes: -480,
    description: 'Pacific Time observed along the Baja California border.',
    keywords: ['mexico', 'tijuana', 'pst']
  },
  {
    value: 'Pacific/Chuuk',
    country: 'Micronesia',
    city: 'Weno',
    region: 'Oceania',
    gmtLabel: 'UTC+10:00',
    offsetMinutes: 600,
    description: 'Chuuk Time used in Chuuk State of Micronesia.',
    keywords: ['micronesia', 'chuuk', 'truk', 'chst']
  },
  {
    value: 'Pacific/Pohnpei',
    country: 'Micronesia',
    city: 'Palikir',
    region: 'Oceania',
    gmtLabel: 'UTC+11:00',
    offsetMinutes: 660,
    description: 'Pohnpei Time covering Pohnpei State including Palikir.',
    keywords: ['micronesia', 'pohnpei', 'ponape', 'pwt']
  },
  {
    value: 'Pacific/Kosrae',
    country: 'Micronesia',
    city: 'Tofol',
    region: 'Oceania',
    gmtLabel: 'UTC+11:00',
    offsetMinutes: 660,
    description: 'Kosrae Time used on Kosrae island.',
    keywords: ['micronesia', 'kosrae', 'kst']
  },
  {
    value: 'Europe/Chisinau',
    country: 'Moldova',
    city: 'Chișinău',
    region: 'Europe',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Eastern European Time covering Moldova.',
    keywords: ['moldova', 'chisinau', 'eet']
  },
  {
    value: 'Europe/Monaco',
    country: 'Monaco',
    city: 'Monaco',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time used in Monaco.',
    keywords: ['monaco', 'monte carlo', 'cet']
  },
  {
    value: 'Asia/Ulaanbaatar',
    country: 'Mongolia',
    city: 'Ulaanbaatar',
    region: 'Asia',
    gmtLabel: 'UTC+08:00',
    offsetMinutes: 480,
    description: 'Ulaanbaatar Time covering eastern and central Mongolia.',
    keywords: ['mongolia', 'ulaanbaatar', 'ulatt']
  },
  {
    value: 'Asia/Hovd',
    country: 'Mongolia',
    city: 'Hovd',
    region: 'Asia',
    gmtLabel: 'UTC+07:00',
    offsetMinutes: 420,
    description: 'Hovd Time covering western Mongolia.',
    keywords: ['mongolia', 'hovd', 'hovt']
  },
  {
    value: 'Europe/Podgorica',
    country: 'Montenegro',
    city: 'Podgorica',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time covering Montenegro.',
    keywords: ['montenegro', 'podgorica', 'cet']
  },
  {
    value: 'Africa/Casablanca',
    country: 'Morocco',
    city: 'Rabat',
    region: 'Africa',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Morocco Time observed year-round with Ramadan adjustments.',
    keywords: ['morocco', 'rabat', 'wemt']
  },
  {
    value: 'Africa/Maputo',
    country: 'Mozambique',
    city: 'Maputo',
    region: 'Africa',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Central Africa Time covering Mozambique.',
    keywords: ['mozambique', 'maputo', 'cat']
  },
  {
    value: 'Asia/Yangon',
    country: 'Myanmar',
    city: 'Yangon',
    region: 'Asia',
    gmtLabel: 'UTC+06:30',
    offsetMinutes: 390,
    description: 'Myanmar Time used nationwide including Yangon.',
    keywords: ['myanmar', 'burma', 'yangon', 'mmt']
  },
  {
    value: 'Africa/Windhoek',
    country: 'Namibia',
    city: 'Windhoek',
    region: 'Africa',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Central Africa Time observed across Namibia.',
    keywords: ['namibia', 'windhoek', 'cat']
  },
  {
    value: 'Pacific/Nauru',
    country: 'Nauru',
    city: 'Yaren',
    region: 'Oceania',
    gmtLabel: 'UTC+12:00',
    offsetMinutes: 720,
    description: 'Nauru Time covering the entire island nation.',
    keywords: ['nauru', 'yaren', 'nrt']
  },
  {
    value: 'Asia/Kathmandu',
    country: 'Nepal',
    city: 'Kathmandu',
    region: 'Asia',
    gmtLabel: 'UTC+05:45',
    offsetMinutes: 345,
    description: 'Nepal Time used nationwide with a unique 45-minute offset.',
    keywords: ['nepal', 'kathmandu', 'npt']
  },
  {
    value: 'Europe/Amsterdam',
    country: 'Netherlands',
    city: 'Amsterdam',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time covering the Netherlands.',
    keywords: ['netherlands', 'amsterdam', 'cet']
  },
  {
    value: 'Pacific/Auckland',
    country: 'New Zealand',
    city: 'Auckland',
    region: 'Oceania',
    gmtLabel: 'UTC+12:00',
    offsetMinutes: 720,
    description: 'New Zealand Standard Time covering the North and South Islands.',
    keywords: ['new zealand', 'auckland', 'nzst']
  },
  {
    value: 'Pacific/Chatham',
    country: 'New Zealand',
    city: 'Waitangi (Chatham Islands)',
    region: 'Oceania',
    gmtLabel: 'UTC+12:45',
    offsetMinutes: 765,
    description: 'Chatham Islands Time unique to the eastern islands.',
    keywords: ['new zealand', 'chatham islands', 'chst']
  },
  {
    value: 'America/Managua',
    country: 'Nicaragua',
    city: 'Managua',
    region: 'North America',
    gmtLabel: 'UTC-06:00',
    offsetMinutes: -360,
    description: 'Central Standard Time observed in Nicaragua.',
    keywords: ['nicaragua', 'managua', 'cst']
  },
  {
    value: 'Africa/Niamey',
    country: 'Niger',
    city: 'Niamey',
    region: 'Africa',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'West Africa Time covering Niger.',
    keywords: ['niger', 'niamey', 'wat']
  },
  {
    value: 'Africa/Lagos',
    country: 'Nigeria',
    city: 'Abuja',
    region: 'Africa',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'West Africa Time observed in Nigeria including Lagos and Abuja.',
    keywords: ['nigeria', 'abuja', 'lagos', 'wat']
  },
  {
    value: 'Asia/Pyongyang',
    country: 'North Korea',
    city: 'Pyongyang',
    region: 'Asia',
    gmtLabel: 'UTC+09:00',
    offsetMinutes: 540,
    description: 'Pyongyang Time aligned with Korea Standard Time.',
    keywords: ['north korea', 'pyongyang', 'kst']
  },
  {
    value: 'Europe/Skopje',
    country: 'North Macedonia',
    city: 'Skopje',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time covering North Macedonia.',
    keywords: ['north macedonia', 'skopje', 'cet']
  },
  {
    value: 'Europe/Oslo',
    country: 'Norway',
    city: 'Oslo',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time observed in Norway.',
    keywords: ['norway', 'oslo', 'cet']
  },
  {
    value: 'Asia/Muscat',
    country: 'Oman',
    city: 'Muscat',
    region: 'Asia',
    gmtLabel: 'UTC+04:00',
    offsetMinutes: 240,
    description: 'Gulf Standard Time covering the Sultanate of Oman.',
    keywords: ['oman', 'muscat', 'gst']
  },
  {
    value: 'Asia/Karachi',
    country: 'Pakistan',
    city: 'Islamabad',
    region: 'Asia',
    gmtLabel: 'UTC+05:00',
    offsetMinutes: 300,
    description: 'Pakistan Standard Time covering Islamabad, Karachi, and nationwide.',
    keywords: ['pakistan', 'karachi', 'islamabad', 'pkt']
  },
  {
    value: 'Pacific/Palau',
    country: 'Palau',
    city: 'Ngerulmud',
    region: 'Oceania',
    gmtLabel: 'UTC+09:00',
    offsetMinutes: 540,
    description: 'Palau Time observed across the archipelago.',
    keywords: ['palau', 'ngerulmud', 'pwt']
  },
  {
    value: 'America/Panama',
    country: 'Panama',
    city: 'Panama City',
    region: 'North America',
    gmtLabel: 'UTC-05:00',
    offsetMinutes: -300,
    description: 'Eastern Standard Time used year-round in Panama.',
    keywords: ['panama', 'panama city', 'est']
  },
  {
    value: 'Pacific/Port_Moresby',
    country: 'Papua New Guinea',
    city: 'Port Moresby',
    region: 'Oceania',
    gmtLabel: 'UTC+10:00',
    offsetMinutes: 600,
    description: 'Papua New Guinea Time covering the mainland including Port Moresby.',
    keywords: ['papua new guinea', 'port moresby', 'pgt']
  },
  {
    value: 'Pacific/Bougainville',
    country: 'Papua New Guinea',
    city: 'Buka',
    region: 'Oceania',
    gmtLabel: 'UTC+11:00',
    offsetMinutes: 660,
    description: 'Bougainville Time observed on the Autonomous Region of Bougainville.',
    keywords: ['papua new guinea', 'bougainville', 'bst']
  },
  {
    value: 'America/Asuncion',
    country: 'Paraguay',
    city: 'Asunción',
    region: 'South America',
    gmtLabel: 'UTC-04:00',
    offsetMinutes: -240,
    description: 'Paraguay Time covering the country including Asunción.',
    keywords: ['paraguay', 'asuncion', 'pytt']
  },
  {
    value: 'America/Lima',
    country: 'Peru',
    city: 'Lima',
    region: 'South America',
    gmtLabel: 'UTC-05:00',
    offsetMinutes: -300,
    description: 'Peru Time observed nationwide without daylight saving.',
    keywords: ['peru', 'lima', 'pet']
  },
  {
    value: 'Asia/Manila',
    country: 'Philippines',
    city: 'Manila',
    region: 'Asia',
    gmtLabel: 'UTC+08:00',
    offsetMinutes: 480,
    description: 'Philippine Time covering the entire archipelago.',
    keywords: ['philippines', 'manila', 'pht']
  },
  {
    value: 'Europe/Warsaw',
    country: 'Poland',
    city: 'Warsaw',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time covering Poland.',
    keywords: ['poland', 'warsaw', 'cet']
  },
  {
    value: 'Europe/Lisbon',
    country: 'Portugal',
    city: 'Lisbon',
    region: 'Europe',
    gmtLabel: 'UTC+00:00',
    offsetMinutes: 0,
    description: 'Western European Time covering mainland Portugal.',
    keywords: ['portugal', 'lisbon', 'wet']
  },
  {
    value: 'Atlantic/Azores',
    country: 'Portugal',
    city: 'Ponta Delgada',
    region: 'Europe',
    gmtLabel: 'UTC-01:00',
    offsetMinutes: -60,
    description: 'Azores Time used on the mid-Atlantic islands.',
    keywords: ['portugal', 'azores', 'azot']
  },
  {
    value: 'Asia/Qatar',
    country: 'Qatar',
    city: 'Doha',
    region: 'Asia',
    gmtLabel: 'UTC+03:00',
    offsetMinutes: 180,
    description: 'Arabia Standard Time covering Qatar.',
    keywords: ['qatar', 'doha', 'ast']
  },
  {
    value: 'Africa/Brazzaville',
    country: 'Republic of the Congo',
    city: 'Brazzaville',
    region: 'Africa',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'West Africa Time covering the Republic of the Congo.',
    keywords: ['republic of the congo', 'brazzaville', 'wat', 'congo']
  },
  {
    value: 'Europe/Bucharest',
    country: 'Romania',
    city: 'Bucharest',
    region: 'Europe',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Eastern European Time observed throughout Romania.',
    keywords: ['romania', 'bucharest', 'eet']
  },
  {
    value: 'Europe/Kaliningrad',
    country: 'Russia',
    city: 'Kaliningrad',
    region: 'Europe',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Kaliningrad Time used in the western exclave of Russia.',
    keywords: ['russia', 'kaliningrad', 'kalt']
  },
  {
    value: 'Europe/Moscow',
    country: 'Russia',
    city: 'Moscow',
    region: 'Europe',
    gmtLabel: 'UTC+03:00',
    offsetMinutes: 180,
    description: 'Moscow Time covering the nation’s capital and west Russia.',
    keywords: ['russia', 'moscow', 'msk']
  },
  {
    value: 'Europe/Samara',
    country: 'Russia',
    city: 'Samara',
    region: 'Europe',
    gmtLabel: 'UTC+04:00',
    offsetMinutes: 240,
    description: 'Samara Time used along the Volga region.',
    keywords: ['russia', 'samara', 'samt']
  },
  {
    value: 'Asia/Yekaterinburg',
    country: 'Russia',
    city: 'Yekaterinburg',
    region: 'Asia',
    gmtLabel: 'UTC+05:00',
    offsetMinutes: 300,
    description: 'Yekaterinburg Time covering the Urals region.',
    keywords: ['russia', 'yekaterinburg', 'yekt']
  },
  {
    value: 'Asia/Omsk',
    country: 'Russia',
    city: 'Omsk',
    region: 'Asia',
    gmtLabel: 'UTC+06:00',
    offsetMinutes: 360,
    description: 'Omsk Time covering southwestern Siberia.',
    keywords: ['russia', 'omsk', 'omst']
  },
  {
    value: 'Asia/Krasnoyarsk',
    country: 'Russia',
    city: 'Krasnoyarsk',
    region: 'Asia',
    gmtLabel: 'UTC+07:00',
    offsetMinutes: 420,
    description: 'Krasnoyarsk Time covering central Siberia.',
    keywords: ['russia', 'krasnoyarsk', 'krat']
  },
  {
    value: 'Asia/Irkutsk',
    country: 'Russia',
    city: 'Irkutsk',
    region: 'Asia',
    gmtLabel: 'UTC+08:00',
    offsetMinutes: 480,
    description: 'Irkutsk Time covering Lake Baikal region.',
    keywords: ['russia', 'irkutsk', 'irkt']
  },
  {
    value: 'Asia/Yakutsk',
    country: 'Russia',
    city: 'Yakutsk',
    region: 'Asia',
    gmtLabel: 'UTC+09:00',
    offsetMinutes: 540,
    description: 'Yakutsk Time covering the Sakha Republic heartland.',
    keywords: ['russia', 'yakutsk', 'yakt']
  },
  {
    value: 'Asia/Vladivostok',
    country: 'Russia',
    city: 'Vladivostok',
    region: 'Asia',
    gmtLabel: 'UTC+10:00',
    offsetMinutes: 600,
    description: 'Vladivostok Time used in the Russian Far East coast.',
    keywords: ['russia', 'vladivostok', 'vlat']
  },
  {
    value: 'Asia/Magadan',
    country: 'Russia',
    city: 'Magadan',
    region: 'Asia',
    gmtLabel: 'UTC+11:00',
    offsetMinutes: 660,
    description: 'Magadan Time covering the Sea of Okhotsk region.',
    keywords: ['russia', 'magadan', 'magt']
  },
  {
    value: 'Asia/Kamchatka',
    country: 'Russia',
    city: 'Petropavlovsk-Kamchatsky',
    region: 'Asia',
    gmtLabel: 'UTC+12:00',
    offsetMinutes: 720,
    description: 'Kamchatka Time covering the far eastern peninsulas.',
    keywords: ['russia', 'kamchatka', 'pett']
  },
  {
    value: 'Africa/Kigali',
    country: 'Rwanda',
    city: 'Kigali',
    region: 'Africa',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Central Africa Time covering Rwanda.',
    keywords: ['rwanda', 'kigali', 'cat']
  },
  {
    value: 'America/St_Kitts',
    country: 'Saint Kitts and Nevis',
    city: 'Basseterre',
    region: 'North America',
    gmtLabel: 'UTC-04:00',
    offsetMinutes: -240,
    description: 'Atlantic Standard Time covering the twin-island nation.',
    keywords: ['saint kitts', 'nevis', 'basseterre', 'ast']
  },
  {
    value: 'America/St_Lucia',
    country: 'Saint Lucia',
    city: 'Castries',
    region: 'North America',
    gmtLabel: 'UTC-04:00',
    offsetMinutes: -240,
    description: 'Atlantic Standard Time observed on Saint Lucia.',
    keywords: ['saint lucia', 'castries', 'ast']
  },
  {
    value: 'America/St_Vincent',
    country: 'Saint Vincent and the Grenadines',
    city: 'Kingstown',
    region: 'North America',
    gmtLabel: 'UTC-04:00',
    offsetMinutes: -240,
    description: 'Atlantic Standard Time covering Saint Vincent and the Grenadines.',
    keywords: ['saint vincent', 'grenadines', 'kingstown', 'ast']
  },
  {
    value: 'Pacific/Apia',
    country: 'Samoa',
    city: 'Apia',
    region: 'Oceania',
    gmtLabel: 'UTC+13:00',
    offsetMinutes: 780,
    description: 'West Samoa Time observed in Samoa.',
    keywords: ['samoa', 'apia', 'wsst']
  },
  {
    value: 'Europe/San_Marino',
    country: 'San Marino',
    city: 'San Marino',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time covering the enclaved microstate.',
    keywords: ['san marino', 'cet']
  },
  {
    value: 'Africa/Sao_Tome',
    country: 'São Tomé and Príncipe',
    city: 'São Tomé',
    region: 'Africa',
    gmtLabel: 'UTC+00:00',
    offsetMinutes: 0,
    description: 'Greenwich Mean Time used on São Tomé and Príncipe.',
    keywords: ['sao tome', 'principe', 'gmt']
  },
  {
    value: 'Asia/Riyadh',
    country: 'Saudi Arabia',
    city: 'Riyadh',
    region: 'Asia',
    gmtLabel: 'UTC+03:00',
    offsetMinutes: 180,
    description: 'Arabia Standard Time covering Saudi Arabia.',
    keywords: ['saudi arabia', 'riyadh', 'ast']
  },
  {
    value: 'Africa/Dakar',
    country: 'Senegal',
    city: 'Dakar',
    region: 'Africa',
    gmtLabel: 'UTC+00:00',
    offsetMinutes: 0,
    description: 'Greenwich Mean Time covering Senegal.',
    keywords: ['senegal', 'dakar', 'gmt']
  },
  {
    value: 'Europe/Belgrade',
    country: 'Serbia',
    city: 'Belgrade',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time observed across Serbia.',
    keywords: ['serbia', 'belgrade', 'cet']
  },
  {
    value: 'Indian/Mahe',
    country: 'Seychelles',
    city: 'Victoria',
    region: 'Africa',
    gmtLabel: 'UTC+04:00',
    offsetMinutes: 240,
    description: 'Seychelles Time covering the archipelago.',
    keywords: ['seychelles', 'victoria', 'sct']
  },
  {
    value: 'Africa/Freetown',
    country: 'Sierra Leone',
    city: 'Freetown',
    region: 'Africa',
    gmtLabel: 'UTC+00:00',
    offsetMinutes: 0,
    description: 'Greenwich Mean Time observed across Sierra Leone.',
    keywords: ['sierra leone', 'freetown', 'gmt']
  },
  {
    value: 'Asia/Singapore',
    country: 'Singapore',
    city: 'Singapore',
    region: 'Asia',
    gmtLabel: 'UTC+08:00',
    offsetMinutes: 480,
    description: 'Singapore Standard Time covering the city-state.',
    keywords: ['singapore', 'sgt']
  },
  {
    value: 'Europe/Bratislava',
    country: 'Slovakia',
    city: 'Bratislava',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time covering Slovakia.',
    keywords: ['slovakia', 'bratislava', 'cet']
  },
  {
    value: 'Europe/Ljubljana',
    country: 'Slovenia',
    city: 'Ljubljana',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time observed in Slovenia.',
    keywords: ['slovenia', 'ljubljana', 'cet']
  },
  {
    value: 'Pacific/Guadalcanal',
    country: 'Solomon Islands',
    city: 'Honiara',
    region: 'Oceania',
    gmtLabel: 'UTC+11:00',
    offsetMinutes: 660,
    description: 'Solomon Islands Time covering Guadalcanal and surrounding islands.',
    keywords: ['solomon islands', 'honiara', 'sbt']
  },
  {
    value: 'Africa/Mogadishu',
    country: 'Somalia',
    city: 'Mogadishu',
    region: 'Africa',
    gmtLabel: 'UTC+03:00',
    offsetMinutes: 180,
    description: 'East Africa Time observed across Somalia.',
    keywords: ['somalia', 'mogadishu', 'eat']
  },
  {
    value: 'Africa/Johannesburg',
    country: 'South Africa',
    city: 'Johannesburg',
    region: 'Africa',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'South Africa Standard Time covering the republic.',
    keywords: ['south africa', 'johannesburg', 'sast']
  },
  {
    value: 'Asia/Seoul',
    country: 'South Korea',
    city: 'Seoul',
    region: 'Asia',
    gmtLabel: 'UTC+09:00',
    offsetMinutes: 540,
    description: 'Korea Standard Time covering South Korea.',
    keywords: ['south korea', 'seoul', 'kst']
  },
  {
    value: 'Africa/Juba',
    country: 'South Sudan',
    city: 'Juba',
    region: 'Africa',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Central Africa Time observed across South Sudan.',
    keywords: ['south sudan', 'juba', 'cat']
  },
  {
    value: 'Europe/Madrid',
    country: 'Spain',
    city: 'Madrid',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time covering mainland Spain.',
    keywords: ['spain', 'madrid', 'cet']
  },
  {
    value: 'Atlantic/Canary',
    country: 'Spain',
    city: 'Las Palmas',
    region: 'Europe',
    gmtLabel: 'UTC+00:00',
    offsetMinutes: 0,
    description: 'Western European Time used on the Canary Islands.',
    keywords: ['spain', 'canary islands', 'wet']
  },
  {
    value: 'Asia/Colombo',
    country: 'Sri Lanka',
    city: 'Colombo',
    region: 'Asia',
    gmtLabel: 'UTC+05:30',
    offsetMinutes: 330,
    description: 'Sri Lanka Standard Time observed nationwide.',
    keywords: ['sri lanka', 'colombo', 'slst']
  },
  {
    value: 'Africa/Khartoum',
    country: 'Sudan',
    city: 'Khartoum',
    region: 'Africa',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Central Africa Time covering Sudan.',
    keywords: ['sudan', 'khartoum', 'cat']
  },
  {
    value: 'America/Paramaribo',
    country: 'Suriname',
    city: 'Paramaribo',
    region: 'South America',
    gmtLabel: 'UTC-03:00',
    offsetMinutes: -180,
    description: 'Suriname Time used across the country.',
    keywords: ['suriname', 'paramaribo', 'srt']
  },
  {
    value: 'Europe/Stockholm',
    country: 'Sweden',
    city: 'Stockholm',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time covering Sweden.',
    keywords: ['sweden', 'stockholm', 'cet']
  },
  {
    value: 'Europe/Zurich',
    country: 'Switzerland',
    city: 'Zurich',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time used throughout Switzerland.',
    keywords: ['switzerland', 'zurich', 'cet']
  },
  {
    value: 'Asia/Damascus',
    country: 'Syria',
    city: 'Damascus',
    region: 'Asia',
    gmtLabel: 'UTC+03:00',
    offsetMinutes: 180,
    description: 'Syria Time observed year-round since 2022.',
    keywords: ['syria', 'damascus', 'syt']
  },
  {
    value: 'Asia/Taipei',
    country: 'Taiwan',
    city: 'Taipei',
    region: 'Asia',
    gmtLabel: 'UTC+08:00',
    offsetMinutes: 480,
    description: 'Taiwan Standard Time covering the entire island.',
    keywords: ['taiwan', 'taipei', 'tst']
  },
  {
    value: 'Asia/Dushanbe',
    country: 'Tajikistan',
    city: 'Dushanbe',
    region: 'Asia',
    gmtLabel: 'UTC+05:00',
    offsetMinutes: 300,
    description: 'Tajikistan Time observed nationwide.',
    keywords: ['tajikistan', 'dushanbe', 'tjt']
  },
  {
    value: 'Africa/Dar_es_Salaam',
    country: 'Tanzania',
    city: 'Dodoma',
    region: 'Africa',
    gmtLabel: 'UTC+03:00',
    offsetMinutes: 180,
    description: 'East Africa Time covering Tanzania including Dar es Salaam.',
    keywords: ['tanzania', 'dodoma', 'dar es salaam', 'eat']
  },
  {
    value: 'Asia/Bangkok',
    country: 'Thailand',
    city: 'Bangkok',
    region: 'Asia',
    gmtLabel: 'UTC+07:00',
    offsetMinutes: 420,
    description: 'Thailand observes Indochina Time nationwide.',
    keywords: ['thailand', 'bangkok', 'ict']
  },
  {
    value: 'Asia/Dili',
    country: 'Timor-Leste',
    city: 'Dili',
    region: 'Asia',
    gmtLabel: 'UTC+09:00',
    offsetMinutes: 540,
    description: 'East Timor Time used across Timor-Leste.',
    keywords: ['timor-leste', 'east timor', 'dili', 'tlt']
  },
  {
    value: 'Africa/Lome',
    country: 'Togo',
    city: 'Lomé',
    region: 'Africa',
    gmtLabel: 'UTC+00:00',
    offsetMinutes: 0,
    description: 'Greenwich Mean Time covering Togo.',
    keywords: ['togo', 'lome', 'gmt']
  },
  {
    value: 'Pacific/Tongatapu',
    country: 'Tonga',
    city: "Nuku'alofa",
    region: 'Oceania',
    gmtLabel: 'UTC+13:00',
    offsetMinutes: 780,
    description: 'Tonga Time observed on Tongatapu and other islands.',
    keywords: ['tonga', "nuku'alofa", 'tot']
  },
  {
    value: 'America/Port_of_Spain',
    country: 'Trinidad and Tobago',
    city: 'Port of Spain',
    region: 'North America',
    gmtLabel: 'UTC-04:00',
    offsetMinutes: -240,
    description: 'Atlantic Standard Time covering Trinidad and Tobago.',
    keywords: ['trinidad', 'tobago', 'port of spain', 'ast']
  },
  {
    value: 'Africa/Tunis',
    country: 'Tunisia',
    city: 'Tunis',
    region: 'Africa',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time observed in Tunisia.',
    keywords: ['tunisia', 'tunis', 'cet']
  },
  {
    value: 'Europe/Istanbul',
    country: 'Turkey',
    city: 'Istanbul',
    region: 'Asia',
    gmtLabel: 'UTC+03:00',
    offsetMinutes: 180,
    description: 'Turkey Time observed year-round across the country.',
    keywords: ['turkey', 'istanbul', 'trt']
  },
  {
    value: 'Asia/Ashgabat',
    country: 'Turkmenistan',
    city: 'Ashgabat',
    region: 'Asia',
    gmtLabel: 'UTC+05:00',
    offsetMinutes: 300,
    description: 'Turkmenistan Time covering the entire nation.',
    keywords: ['turkmenistan', 'ashgabat', 'tmt']
  },
  {
    value: 'Pacific/Funafuti',
    country: 'Tuvalu',
    city: 'Funafuti',
    region: 'Oceania',
    gmtLabel: 'UTC+12:00',
    offsetMinutes: 720,
    description: 'Tuvalu Time observed across the islands.',
    keywords: ['tuvalu', 'funafuti', 'tvt']
  },
  {
    value: 'Africa/Kampala',
    country: 'Uganda',
    city: 'Kampala',
    region: 'Africa',
    gmtLabel: 'UTC+03:00',
    offsetMinutes: 180,
    description: 'East Africa Time covering Uganda.',
    keywords: ['uganda', 'kampala', 'eat']
  },
  {
    value: 'Europe/Kyiv',
    country: 'Ukraine',
    city: 'Kyiv',
    region: 'Europe',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Eastern European Time observed across Ukraine.',
    keywords: ['ukraine', 'kyiv', 'eet']
  },
  {
    value: 'Asia/Dubai',
    country: 'United Arab Emirates',
    city: 'Dubai',
    region: 'Asia',
    gmtLabel: 'UTC+04:00',
    offsetMinutes: 240,
    description: 'Gulf Standard Time covering the UAE cities of Dubai and Abu Dhabi.',
    keywords: ['united arab emirates', 'dubai', 'abu dhabi', 'gst']
  },
  {
    value: 'Europe/London',
    country: 'United Kingdom',
    city: 'London',
    region: 'Europe',
    gmtLabel: 'UTC+00:00',
    offsetMinutes: 0,
    description: 'Greenwich Mean Time covering the UK with British Summer Time adjustments.',
    keywords: ['united kingdom', 'uk', 'london', 'gmt', 'bst']
  },
  {
    value: 'America/New_York',
    country: 'United States',
    city: 'New York',
    region: 'North America',
    gmtLabel: 'UTC-05:00',
    offsetMinutes: -300,
    description: 'Eastern Time covering the US East Coast including New York.',
    keywords: ['united states', 'usa', 'new york', 'est']
  },
  {
    value: 'America/Chicago',
    country: 'United States',
    city: 'Chicago',
    region: 'North America',
    gmtLabel: 'UTC-06:00',
    offsetMinutes: -360,
    description: 'Central Time covering the US Midwest including Chicago.',
    keywords: ['united states', 'usa', 'chicago', 'cst']
  },
  {
    value: 'America/Denver',
    country: 'United States',
    city: 'Denver',
    region: 'North America',
    gmtLabel: 'UTC-07:00',
    offsetMinutes: -420,
    description: 'Mountain Time covering the Rocky Mountain states.',
    keywords: ['united states', 'usa', 'denver', 'mst']
  },
  {
    value: 'America/Phoenix',
    country: 'United States',
    city: 'Phoenix',
    region: 'North America',
    gmtLabel: 'UTC-07:00',
    offsetMinutes: -420,
    description: 'Mountain Standard Time year-round in most of Arizona including Phoenix.',
    keywords: ['united states', 'usa', 'phoenix', 'mst', 'arizona']
  },
  {
    value: 'America/Los_Angeles',
    country: 'United States',
    city: 'Los Angeles',
    region: 'North America',
    gmtLabel: 'UTC-08:00',
    offsetMinutes: -480,
    description: 'Pacific Time covering the US West Coast including Los Angeles.',
    keywords: ['united states', 'usa', 'los angeles', 'pst']
  },
  {
    value: 'America/Anchorage',
    country: 'United States',
    city: 'Anchorage',
    region: 'North America',
    gmtLabel: 'UTC-09:00',
    offsetMinutes: -540,
    description: 'Alaska Time used across mainland Alaska.',
    keywords: ['united states', 'usa', 'anchorage', 'akst']
  },
  {
    value: 'Pacific/Honolulu',
    country: 'United States',
    city: 'Honolulu',
    region: 'Oceania',
    gmtLabel: 'UTC-10:00',
    offsetMinutes: -600,
    description: 'Hawaii-Aleutian Standard Time covering the Hawaiian Islands.',
    keywords: ['united states', 'usa', 'hawaii', 'honolulu', 'hst']
  },
  {
    value: 'America/Montevideo',
    country: 'Uruguay',
    city: 'Montevideo',
    region: 'South America',
    gmtLabel: 'UTC-03:00',
    offsetMinutes: -180,
    description: 'Uruguay Time observed nationwide without daylight saving.',
    keywords: ['uruguay', 'montevideo', 'uyt']
  },
  {
    value: 'Asia/Tashkent',
    country: 'Uzbekistan',
    city: 'Tashkent',
    region: 'Asia',
    gmtLabel: 'UTC+05:00',
    offsetMinutes: 300,
    description: 'Uzbekistan Time covering the entire country.',
    keywords: ['uzbekistan', 'tashkent', 'uzt']
  },
  {
    value: 'Pacific/Efate',
    country: 'Vanuatu',
    city: 'Port Vila',
    region: 'Oceania',
    gmtLabel: 'UTC+11:00',
    offsetMinutes: 660,
    description: 'Vanuatu Time observed across the islands including Port Vila.',
    keywords: ['vanuatu', 'port vila', 'vut']
  },
  {
    value: 'Europe/Vatican',
    country: 'Vatican City',
    city: 'Vatican City',
    region: 'Europe',
    gmtLabel: 'UTC+01:00',
    offsetMinutes: 60,
    description: 'Central European Time covering the Holy See.',
    keywords: ['vatican', 'holy see', 'cet']
  },
  {
    value: 'America/Caracas',
    country: 'Venezuela',
    city: 'Caracas',
    region: 'South America',
    gmtLabel: 'UTC-04:00',
    offsetMinutes: -240,
    description: 'Venezuela Time observed nationwide.',
    keywords: ['venezuela', 'caracas', 'vet']
  },
  {
    value: 'Asia/Ho_Chi_Minh',
    country: 'Vietnam',
    city: 'Hanoi',
    region: 'Asia',
    gmtLabel: 'UTC+07:00',
    offsetMinutes: 420,
    description: 'Vietnam Standard Time covering Hanoi and Ho Chi Minh City.',
    keywords: ['vietnam', 'hanoi', 'ho chi minh', 'ict']
  },
  {
    value: 'Asia/Aden',
    country: 'Yemen',
    city: 'Sana\'a',
    region: 'Asia',
    gmtLabel: 'UTC+03:00',
    offsetMinutes: 180,
    description: 'Arabia Standard Time covering Yemen.',
    keywords: ['yemen', "sana'a", 'ast']
  },
  {
    value: 'Africa/Lusaka',
    country: 'Zambia',
    city: 'Lusaka',
    region: 'Africa',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Central Africa Time covering Zambia.',
    keywords: ['zambia', 'lusaka', 'cat']
  },
  {
    value: 'Africa/Harare',
    country: 'Zimbabwe',
    city: 'Harare',
    region: 'Africa',
    gmtLabel: 'UTC+02:00',
    offsetMinutes: 120,
    description: 'Central Africa Time observed in Zimbabwe.',
    keywords: ['zimbabwe', 'harare', 'cat']
  }
];

const SORTED_TIMEZONES = [...PRESET_TIMEZONES].sort((a, b) => {
  const countryCompare = a.country.localeCompare(b.country, undefined, { sensitivity: 'base' });
  if (countryCompare !== 0) {
    return countryCompare;
  }

  const cityCompare = (a.city || '').localeCompare(b.city || '', undefined, {
    sensitivity: 'base'
  });
  if (cityCompare !== 0) {
    return cityCompare;
  }

  return a.value.localeCompare(b.value, undefined, { sensitivity: 'base' });
});

const normalize = (value = '') => value.toLowerCase();

const formatUtcLabel = (offsetMinutes) => {
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const absoluteMinutes = Math.abs(offsetMinutes);
  const hours = Math.floor(absoluteMinutes / 60)
    .toString()
    .padStart(2, '0');
  const minutes = (absoluteMinutes % 60).toString().padStart(2, '0');
  return `UTC${sign}${hours}:${minutes}`;
};

const enrichTimezone = (timezone) => {
  const zone = moment.tz.zone(timezone.value);
  if (!zone) {
    return timezone;
  }

  const nowInZone = moment().tz(timezone.value);
  const offsetMinutes = nowInZone.utcOffset();
  const gmtLabel = formatUtcLabel(offsetMinutes);

  return {
    ...timezone,
    offsetMinutes,
    gmtLabel
  };
};

const buildSearchString = (timezone) =>
  [
    timezone.country,
    timezone.city,
    timezone.region,
    timezone.value,
    timezone.gmtLabel,
    ...(timezone.keywords || [])
  ]
    .join(' ')
    .toLowerCase();

const ENRICHED_TIMEZONES = SORTED_TIMEZONES.map((timezone) => {
  const enriched = enrichTimezone(timezone);
  return {
    ...enriched,
    searchValue: buildSearchString(enriched)
  };
});

const usePresetTimezones = () => {
  const searchTimezones = useCallback((query = '') => {
    const normalizedQuery = normalize(query.trim());
    if (!normalizedQuery) {
      return ENRICHED_TIMEZONES;
    }

    return ENRICHED_TIMEZONES.filter((timezone) =>
      timezone.searchValue.includes(normalizedQuery)
    );
  }, []);

  return {
    timezones: ENRICHED_TIMEZONES,
    searchTimezones
  };
};

export default usePresetTimezones;
