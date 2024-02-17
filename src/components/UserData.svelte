<script lang="ts">
  import { onMount } from "svelte";
  import type { User } from '@/types/user'

  let user: User;

  onMount(async () => {
    try{
      const response = await fetch('/api/auth/statechanged')
      const res = await response.json()
      console.log(res)
      user = res.user
    }
    catch(err){
      console.log(err)
    }
  });
</script>

<div>
  <h3>UserData</h3>
  {#if user}
    <p>Hello!{user.email}</p>
  {:else}
    <p>Loading...</p>
  {/if}
</div>
