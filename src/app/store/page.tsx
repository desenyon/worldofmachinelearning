'use client';

import { motion } from 'framer-motion';
import { useXP } from '@/context/XPContext';
import Card from '@/components/Card';
import Badge from '@/components/Badge';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const storeItems = [
  {
    id: 'stickers-pack',
    name: 'Hack Club Sticker Pack',
    description: 'A pack of 5 Hack Club stickers featuring the classic logo and ML-themed designs.',
    cost: 15,
    category: 'Physical',
    image: '/stickers.png',
  },
  {
    id: 'notebook',
    name: 'ML Lab Notebook',
    description: 'A custom notebook with graph paper pages, perfect for sketching model architectures.',
    cost: 30,
    category: 'Physical',
    image: '/notebook.png',
  },
  {
    id: 'tshirt',
    name: 'World of ML T-Shirt',
    description: 'Soft cotton t-shirt with the World of ML logo. Available in S, M, L, XL.',
    cost: 50,
    category: 'Physical',
    image: '/tshirt.png',
  },
  {
    id: 'mechanical-keyboard',
    name: 'Mechanical Keyboard',
    description: 'A compact mechanical keyboard with Cherry MX switches. Perfect for coding.',
    cost: 150,
    category: 'Physical',
    image: '/keyboard.png',
  },
  {
    id: 'gpu-credits',
    name: 'GPU Credits ($25)',
    description: '$25 in cloud GPU credits for training larger models on services like Lambda Labs.',
    cost: 100,
    category: 'Digital',
    image: '/gpu.png',
  },
  {
    id: 'domain',
    name: 'Custom Domain (1 year)',
    description: 'One year of a custom .dev or .tech domain for your ML portfolio.',
    cost: 40,
    category: 'Digital',
    image: '/domain.png',
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot (3 months)',
    description: 'Three months of GitHub Copilot to help you write code faster.',
    cost: 75,
    category: 'Digital',
    image: '/copilot.png',
  },
  {
    id: 'ml-book',
    name: 'ML Book of Your Choice',
    description: 'Choose any machine learning book up to $50. We will ship it to you.',
    cost: 60,
    category: 'Physical',
    image: '/book.png',
  },
];

export default function StorePage() {
  const { totalXP, redeemedItems, redeemItem, canAfford } = useXP();

  const handleRedeem = (itemId: string, cost: number, itemName: string) => {
    if (redeemedItems.includes(itemId)) {
      alert('You have already redeemed this item!');
      return;
    }
    if (!canAfford(cost)) {
      alert(`You need ${cost - totalXP} more XP to redeem this item.`);
      return;
    }
    const confirmed = confirm(`Redeem ${itemName} for ${cost} XP?`);
    if (confirmed) {
      const success = redeemItem(itemId, cost);
      if (success) {
        alert('Item redeemed! Check your email for details on how to claim your reward.');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-2">
            <span className="mono-label">Rewards</span>
          </div>
          <h1 className="text-2xl font-semibold text-slate-900 mb-2">XP Store</h1>
          <p className="text-slate-600 max-w-2xl">
            Redeem your hard-earned XP for real Hack Club prizes. Complete tutorials (1 XP each) 
            and submit projects (10 XP each) to earn more.
          </p>
        </motion.div>

        {/* XP Balance Card */}
        <motion.div variants={itemVariants}>
          <div className="bg-slate-900 text-white border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Your Balance</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold font-mono">{totalXP}</span>
                  <span className="text-slate-400">XP</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-sm mb-1">How to Earn</p>
                <p className="text-sm">
                  <span className="text-emerald-400">+1 XP</span> per tutorial step
                </p>
                <p className="text-sm">
                  <span className="text-emerald-400">+10 XP</span> per submitted project
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Store Items */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Available Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {storeItems.map((item) => {
              const isRedeemed = redeemedItems.includes(item.id);
              const affordable = canAfford(item.cost);
              
              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className={`
                    card-base p-5 transition-all
                    ${isRedeemed ? 'opacity-60' : ''}
                    ${!isRedeemed && affordable ? 'hover:shadow-lg cursor-pointer' : ''}
                  `}
                  whileHover={!isRedeemed && affordable ? { y: -4 } : {}}
                >
                  {/* Placeholder for image */}
                  <div 
                    className="w-full h-32 rounded-md mb-4 flex items-center justify-center font-mono text-2xl font-bold"
                    style={{ backgroundColor: 'var(--color-lab-surface-alt)', color: 'var(--color-accent)' }}
                  >
                    {item.category === 'Physical' ? (
                      item.id === 'stickers-pack' ? 'STICKERS' :
                      item.id === 'notebook' ? 'NOTEBOOK' :
                      item.id === 'tshirt' ? 'T-SHIRT' :
                      item.id === 'mechanical-keyboard' ? 'KB' :
                      item.id === 'ml-book' ? 'BOOK' : 'ITEM'
                    ) : (
                      item.id === 'gpu-credits' ? 'GPU' :
                      item.id === 'domain' ? '.DEV' :
                      item.id === 'github-copilot' ? 'COPILOT' : 'DIGITAL'
                    )}
                  </div>
                  
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-slate-900">{item.name}</h3>
                    <Badge variant={item.category === 'Physical' ? 'default' : 'accent'}>
                      {item.category}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-4">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-semibold" style={{ color: 'var(--color-accent)' }}>
                      {item.cost} XP
                    </span>
                    <button
                      onClick={() => handleRedeem(item.id, item.cost, item.name)}
                      disabled={isRedeemed}
                      className={`
                        px-4 py-2 text-sm font-medium rounded-md transition-colors
                        ${isRedeemed 
                          ? 'bg-emerald-100 text-emerald-700 cursor-default'
                          : affordable
                            ? 'text-white'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }
                      `}
                      style={!isRedeemed && affordable ? { backgroundColor: 'var(--color-accent)' } : {}}
                    >
                      {isRedeemed ? 'Redeemed' : affordable ? 'Redeem' : 'Need More XP'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div variants={itemVariants}>
          <Card padding="md">
            <h3 className="font-semibold text-slate-900 mb-2">How Redemption Works</h3>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>1. Click "Redeem" on any item you can afford</li>
              <li>2. Confirm your redemption</li>
              <li>3. Check your email for a form to provide shipping details (physical items) or claim instructions (digital items)</li>
              <li>4. Physical items ship within 2-4 weeks. Digital items are delivered within 48 hours.</li>
            </ul>
            <p className="text-sm text-slate-500 mt-4">
              Questions? Reach out in the #world-of-ml channel on <a href="https://hackclub.com/slack" className="underline" target="_blank" rel="noopener noreferrer">Hack Club Slack</a>.
            </p>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
