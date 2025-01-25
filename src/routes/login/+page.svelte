<script>
    import { fade, fly } from 'svelte/transition';
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';
    
    let username = '';
    let password = '';
    
    async function handleLogin(event) {
      event.preventDefault();
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password })
        });
    
        const data = await response.json();
    
        if (response.ok && browser) {
          document.cookie = `token=${data.token}; path=/; secure; samesite=strict`;
          goto('/dashboard');
        } else {
          alert('Login failed');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred');
      }
    }
</script>

<div class="relative min-h-screen bg-[#1D1F21] overflow-hidden font-sans">
    <!-- Blurry blobs using Minecraft mineral colors -->
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
      <nav class="container mx-auto px-6 py-6">
        <div class="flex items-center justify-between p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <div class="text-[#55F2F2] text-2xl font-bold tracking-tight">SmartBank</div>
          <div class="space-x-4">
            <a href="/" class="text-[#E0E0E0] hover:text-[#50C878] px-6 py-2.5 rounded-xl border border-white/10 hover:border-[#50C878]/30 backdrop-blur-xl transition-all duration-300">
              Home
            </a>
            <a href="/register" class="bg-gradient-to-r from-[#345EC3] to-[#50C878] hover:from-[#50C878] hover:to-[#345EC3] text-white px-6 py-2.5 rounded-xl transition-all duration-300">
              Register
            </a>
          </div>
        </div>
      </nav>

      <main class="container mx-auto px-6 pt-12 pb-32">
        <div class="max-w-md mx-auto" in:fly={{y: 20, duration: 800}}>
          <div class="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h2 class="text-3xl font-bold bg-gradient-to-r from-[#55F2F2] to-[#50C878] bg-clip-text text-transparent mb-8 text-center">
              Login to SmartBank
            </h2>
            
            <form on:submit={handleLogin} class="space-y-6">
              <div>
                <label for="username" class="block text-[#E0E0E0]/90 mb-2 text-sm">Username</label>
                <input 
                  type="text" 
                  id="username" 
                  bind:value={username}
                  class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#55F2F2]/50 transition-all"
                  placeholder="Enter your username"
                  required
                />
              </div>
              
              <div>
                <label for="password" class="block text-[#E0E0E0]/90 mb-2 text-sm">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  bind:value={password}
                  class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#55F2F2]/50 transition-all"
                  placeholder="Enter your password"
                  required
                />
                <a 
                  href="/forgot-password" 
                  class="text-sm text-[#55F2F2] hover:text-[#50C878] mt-2 inline-block transition-colors"
                >
                  Forgot Password?
                </a>
              </div>
              
              <button 
                type="submit" 
                class="w-full bg-gradient-to-r from-[#345EC3] to-[#50C878] hover:from-[#50C878] hover:to-[#345EC3] text-white py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(80,200,120,0.3)]"
              >
                Sign In
              </button>
            </form>
            
            <div class="text-center mt-6">
              <p class="text-[#E0E0E0]/70">
                Don't have an account? 
                <a 
                  href="/register" 
                  class="text-[#55F2F2] hover:text-[#50C878] transition-colors"
                >
                  Register here
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
</div>

<style>
    :global(body) {
        font-family: 'Inter', system-ui, sans-serif;
    }
</style>