<script>
    import { fade, fly } from 'svelte/transition';
    import { Store, ShoppingBasket, Landmark as Bank, Truck, Package, User } from 'lucide-svelte';
</script>

<div class="relative min-h-screen bg-[#1D1F21] overflow-hidden font-sans">
    <!-- Blurry blobs with improved colors and animation -->
    {#each Array(5) as _, i}
      <div
        in:fade={{delay: i * 200}}
        class="absolute blur-[120px] opacity-40 animate-pulse"
        style="
          background: {['#55F2F2', '#50C878', '#FF3333', '#345EC3', '#FFD700'][i]};
          width: {Math.random() * 500 + 300}px;
          height: {Math.random() * 500 + 300}px;
          left: {Math.random() * 100}%;
          top: {Math.random() * 100}%;
          transform: translate(-50%, -50%);
          animation-delay: {i * 2}s;
        "
      />
    {/each}

    <div class="relative z-10">
      <!-- Modern navigation with glass effect -->
      <nav class="container mx-auto px-6 py-6">
        <div class="flex items-center justify-between p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <div class="text-[#55F2F2] text-2xl font-bold tracking-tight">SmartBank</div>
          <div class="space-x-4">
            <a
              href="/login"
              class="text-[#E0E0E0] hover:text-[#50C878] px-6 py-2.5 rounded-xl border border-white/10 hover:border-[#50C878]/30 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(80,200,120,0.15)]"
            >
              Trade
            </a>
            <a
              href="/register"
              class="bg-gradient-to-r from-[#345EC3] to-[#50C878] hover:from-[#50C878] hover:to-[#345EC3] text-white px-6 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(80,200,120,0.3)]"
            >
              Join Bank
            </a>
          </div>
        </div>
      </nav>

      <!-- Enhanced Navigation Menu -->
      <div class="container mx-auto px-6 py-4">
        <div class="flex justify-center items-center space-x-8 backdrop-blur-xl bg-white/5 p-4 rounded-xl border border-white/10 shadow-lg">
          {#each [
            { href: '/shop', icon: Store, text: 'Village Shop', color: '#FFD700' },
            { href: '/marketplace', icon: ShoppingBasket, text: 'Marketplace', color: '#50C878' },
            { href: '/bank', icon: Bank, text: 'Bank Vault', color: '#55F2F2' },
            { href: '/shipping', icon: Truck, text: 'Shipping', color: '#FF3333' },
            { href: '/storage', icon: Package, text: 'Storage', color: '#345EC3' },
            { href: '/account', icon: User, text: 'Account', color: '#FFD700' }
          ] as {href, icon: Icon, text, color}}
            <a
              href={href}
              class="text-[#E0E0E0] hover:text-[{color}] transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5"
            >
              <Icon size={20} />
              <span class="font-medium">{text}</span>
            </a>
          {/each}
        </div>
      </div>

      <!-- Enhanced main content -->
      <main class="container mx-auto px-6 pt-16 pb-32" in:fly={{y: 20, duration: 800}}>
        <div class="max-w-3xl mx-auto text-center">
          <h1
            class="text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#55F2F2] to-[#50C878] bg-clip-text text-transparent mb-8 leading-tight tracking-tight"
          >
            Gary MC Server Bank
          </h1>
          <p class="text-xl text-[#E0E0E0]/90 mb-12 leading-relaxed">
            Store your diamonds and emeralds safely! Best exchange rates in the server.
            Protected by S.I.G.M.A.S.
          </p>
          <div class="space-x-6">
            <a
              href="/register"
              class="inline-block bg-gradient-to-r from-[#345EC3] to-[#50C878] hover:from-[#50C878] hover:to-[#345EC3] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(80,200,120,0.3)]"
            >
              Start Trading
            </a>
            <a
              href="/learn-more"
              class="inline-block text-[#E0E0E0] hover:text-white px-8 py-4 rounded-xl text-lg font-semibold border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all duration-300 hover:bg-white/5"
            >
              View Rates
            </a>
          </div>
        </div>

        <!-- Enhanced Features -->
        <div class="grid md:grid-cols-3 gap-8 mt-32">
          {#each [
            {
              title: 'Redstone Security',
              description: 'Your valuables protected by advanced redstone contraptions and guard villagers'
            },
            {
              title: '24/7 Trading',
              description: 'Our villager staff never sleep! Trade any time at the best rates'
            },
            {
              title: 'Item Storage',
              description: 'Shulker box storage system with maximum security for your precious items'
            }
          ] as feature}
            <div class="p-8 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#55F2F2]/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(85,242,242,0.15)]">
              <h3 class="text-xl font-semibold text-[#55F2F2] mb-4">
                {feature.title}
              </h3>
              <p class="text-[#E0E0E0]/90 leading-relaxed">{feature.description}</p>
            </div>
          {/each}
        </div>
      </main>
    </div>
</div>

<style>
    :global(body) {
        font-family: 'Inter', system-ui, sans-serif;
    }
</style>
