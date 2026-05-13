export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'Bonecos' | 'Novidades' | 'Todos';
  imageUrl: string;
  productionTime: string;
  isBestSeller?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Boneca de Vestido Azul',
    description: 'Boneca artesanal tecida inteiramente em crochê com linha amigurumi, apresenta cachinhos detalhados, vestido azul marinho com acabamento em renda e olhos com trava de segurança.\n\nUma peça delicada e durável para presentear ou colecionar.',
    price: 'R$ 135,00',
    category: 'Bonecos',
    imageUrl: 'https://bancodedados-five.vercel.app/1778637125840.png',
    productionTime: '10 a 15 dias',
    isBestSeller: true
  },
  {
    id: '2',
    name: 'Coelhinho de Jardineira',
    description: 'Coelhinho feito à mão em crochê com fio amigurumi macio e resistente, veste uma jardineira azul com detalhes de botões amarelos e possui acabamento hipoalergênico, ideal para o contato com crianças.',
    price: 'R$ 95,00',
    category: 'Bonecos',
    imageUrl: 'https://bancodedados-five.vercel.app/1778637073545.png',
    productionTime: '7 a 10 dias'
  },
  {
    id: '3',
    name: 'Boneca de Laços Azuis',
    description: 'Trabalho manual exclusivo em linha amigurumi, com cores vibrantes e toque macio. Esta boneca de crochê destaca-se pelos grandes laços de cetim e pelo vestido rosa com branco, perfeita para decoração lúdica.',
    price: 'R$ 145,00',
    category: 'Bonecos',
    imageUrl: 'https://bancodedados-five.vercel.app/1778637473025.png',
    productionTime: '12 a 15 dias'
  },
  {
    id: '4',
    name: 'Chaveiro Hello Kitty',
    description: 'Miniatura em crochê feita com linha amigurumi de alto padrão. O acessório conta com laço fúcsia, aplicação de pérola e tassel, unindo a técnica do amigurumi com um acabamento sofisticado para o dia a dia.',
    price: 'R$ 45,00',
    category: 'Novidades',
    imageUrl: 'https://bancodedados-five.vercel.app/1778637275904.png',
    productionTime: '3 a 5 dias'
  }
];

export const WHATSAPP_NUMBER = '559292337537';
