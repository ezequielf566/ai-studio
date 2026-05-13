import React, { useState, useMemo, useEffect } from 'react';
import { Search, ShoppingBag, MessageCircle, Clock, ChevronRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, WHATSAPP_NUMBER, Product } from './types';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    const handlePopState = () => {
      setSelectedProduct(null);
    };

    if (selectedProduct) {
      window.history.pushState({ modalOpen: true }, '');
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [selectedProduct]);

  const handleCloseModal = () => {
    if (window.history.state?.modalOpen) {
      window.history.back();
    } else {
      setSelectedProduct(null);
    }
  };

  const categories = ['Todos', 'Bonecos', 'Novidades'];

  const handleWhatsApp = (product: Product) => {
    const message = `Olá! Gostaria de encomendar o item:\n\n*${product.name}*.\n\nVi no seu catálogo online e gostaria de saber como prosseguir com o pedido.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen pb-20 font-sans selection:bg-stone-200">
      {/* Header */}
      <header className="bg-white transform-gpu">
        <div className="max-w-5xl mx-auto px-4 pt-8 md:pt-12 pb-0 flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-3 transform-gpu"
          >
            <h1 className="font-serif italic text-5xl md:text-7xl text-stone-900 leading-none tracking-tight">
              Meu Catálogo
            </h1>
            <p className="text-[10px] md:text-sm text-stone-400 font-bold uppercase tracking-[0.2em] md:tracking-[0.4em]">
              Amigurumis sob Encomenda
            </p>
          </motion.div>
 
          <div className="relative group max-w-xl mx-auto w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-stone-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="O que você está procurando?"
              className="w-full pl-14 pr-6 py-4 bg-stone-100/50 border border-transparent focus:border-stone-200 rounded-full focus:outline-none focus:ring-4 focus:ring-stone-400/5 transition-all placeholder:text-stone-300 text-sm font-medium text-stone-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Sticky Category Navigation */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md pt-4 pb-6 border-b border-stone-200/50 transform-gpu">
        <div className="max-w-lg mx-auto px-4">
          <nav className="bg-stone-900 rounded-full p-1.5 flex items-center justify-between shadow-2xl shadow-stone-900/10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex-1 py-2.5 px-3 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </div>
 
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 transform-gpu">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col group transform-gpu"
              >
                <div 
                  className="aspect-[4/5] rounded-[2.5rem] overflow-hidden relative cursor-pointer product-image-container border border-stone-200/50"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {product.isBestSeller && (
                    <div className="absolute top-6 left-6">
                      <span className="bg-amber-100/90 backdrop-blur-sm shadow-sm border border-amber-200 px-3 py-1 rounded-full text-[9px] font-bold text-amber-600 uppercase tracking-wider">
                        Mais Vendido
                      </span>
                    </div>
                  )}
                </div>

                <div 
                  className="mt-6 space-y-4 px-2 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="font-bold text-xl text-stone-900 tracking-tight">{product.name}</h3>
                      <span className="font-serif italic text-2xl text-stone-900 block">{product.price}</span>
                    </div>
                    <span className="bg-stone-50 px-2 py-1 rounded-md text-[8px] font-bold text-stone-400 border border-stone-100 uppercase tracking-tighter shrink-0">
                      Sob Encomenda
                    </span>
                  </div>
                  
                  <p className="text-stone-500 text-sm leading-relaxed font-medium line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="px-2 pt-2 space-y-3">
                  <div className="flex items-center gap-2 text-stone-400 bg-stone-50/50 p-2.5 rounded-xl border border-stone-100 cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    <Clock size={14} className="text-stone-300" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Confecção: {product.productionTime} em Manaus</span>
                  </div>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleWhatsApp(product)}
                      className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-stone-900/20 group"
                    >
                      <MessageCircle size={18} fill="currentColor" className="text-emerald-400 group-hover:rotate-12 transition-transform" />
                      <span className="text-[10px] uppercase tracking-[0.2em]">Encomendar via WhatsApp</span>
                    </motion.button>
                  </div>
                </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <h3 className="text-xl font-bold text-stone-900 uppercase">Nada por aqui</h3>
            <p className="text-stone-400 mt-2">Tente buscar por outro item.</p>
          </div>
        )}
      </main>

      {/* Footer Info */}
      <footer className="max-w-5xl mx-auto px-4 py-24 border-t border-stone-200 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-serif italic text-stone-900 leading-tight">Artesanato Local<br/>& Encomendas.</h2>
            <p className="text-stone-500 font-medium leading-relaxed max-w-sm mx-auto md:mx-0">
              Cada ponto é feito individualmente com linha amigurumi de alta qualidade, atendimento exclusivo para Manaus com retirada ou entrega a combinar.
            </p>
          </div>
          <div className="bg-stone-100 p-10 rounded-[2.5rem] space-y-6">
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-5">
              <div className="bg-white p-3 rounded-2xl text-stone-900 shadow-sm shrink-0">
                <Clock size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold uppercase tracking-widest text-[10px] text-stone-400">Tempo de Confecção</h4>
                <p className="text-stone-700 text-sm font-semibold italic">Consulte o prazo específico de cada item logo acima do botão de encomenda.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-stone-200/50 text-center text-stone-300 text-[10px] font-bold uppercase tracking-[0.3em]">
          &copy; 2024 Catálogo de Amigurumis • Bonecos Artesanais • Manaus/AM
        </div>
      </footer>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col md:flex-row overflow-y-auto transform-gpu"
          >
            <div className="md:w-[50%] h-[50vh] md:h-screen shrink-0 relative bg-[#fcfbf9] flex items-center justify-center border-b md:border-b-0 md:border-r border-stone-100">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                className="w-full h-full object-contain p-6 md:p-20"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={handleCloseModal}
                className="absolute top-6 left-6 bg-white shadow-xl p-4 rounded-2xl text-stone-900 hover:bg-stone-50 transition-all z-20 flex items-center gap-2 font-bold text-xs uppercase tracking-widest border border-stone-100"
              >
                <ChevronRight size={20} className="rotate-180" />
                Voltar
              </button>
            </div>
            
            <div className="p-8 md:p-24 flex flex-col bg-white w-full max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-[0.2em]">{selectedProduct.category}</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-serif italic text-stone-900 mb-4 leading-none">{selectedProduct.name}</h2>
              <div className="text-4xl md:text-5xl font-serif italic text-stone-400 mb-12">{selectedProduct.price}</div>
              
              <div className="mb-16">
                <h4 className="text-xs font-bold text-stone-300 uppercase tracking-widest mb-6">Sobre esta peça</h4>
                <p className="text-stone-500 leading-relaxed font-medium text-xl md:text-2xl md:max-w-2xl whitespace-pre-line">
                  {selectedProduct.description}
                </p>
              </div>

              <div className="space-y-10 mt-auto">
                <div className="bg-stone-50 p-8 rounded-[2.5rem] border border-stone-200/50">
                  <div className="flex items-center gap-4 text-stone-400 mb-4">
                    <Clock size={24} className="text-stone-900" />
                    <h5 className="text-xs font-bold uppercase tracking-widest text-stone-900">Prazo de Confecção</h5>
                  </div>
                  <p className="text-base font-medium text-stone-600 pl-10 leading-relaxed">
                    Este é um trabalho manual detalhado, levamos aproximadamente <span className="text-stone-950 font-bold">{selectedProduct.productionTime}</span> para finalizar cada ponto com carinho em Manaus.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01, backgroundColor: '#1c1917' }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleWhatsApp(selectedProduct)}
                  className="w-full bg-stone-900 text-white font-black py-6 rounded-3xl flex items-center justify-center transition-all shadow-xl shadow-stone-900/30 group relative overflow-hidden px-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="flex items-center justify-center gap-3">
                    <div className="bg-emerald-500 p-1.5 rounded-full group-hover:scale-110 transition-transform shrink-0">
                      <MessageCircle size={18} fill="white" className="text-white" />
                    </div>
                    <span className="text-xs md:text-sm uppercase tracking-[0.2em] whitespace-nowrap">Conversar no WhatsApp</span>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
