<script lang="ts">
  import { onMount } from "svelte";
  import { userData } from "@/store/store";
  import type { User } from "@/types/user";

  let user: User;
  export let userid: string;
  $: uid = $userData;

  onMount(async () => {
    try {
      const response = await fetch("/api/auth/setsession");
      const res = await response.json();
      userData.set(res.user?.id || null);
      user = res.user;
    } catch (err) {
      console.log(err);
    }
  });
</script>

<div>
  <h3>UserAuth</h3>
  {#if user}
    <p>Hello!{user.email}</p>
    <p>StoreUid: {uid}</p>
    <p>PropsUid: {userid}</p>
  {:else}
    <p>Loading...</p>
  {/if}
</div>
