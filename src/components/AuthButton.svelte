<script lang="ts">
  import { onMount } from "svelte";
  import type { User } from "@/types/user";

  let uid: User;
  let loading = true;

  onMount(async () => {
    try {
      const response = await fetch("/api/auth/authcheck");
      const res = await response.json();
      uid = res.user;
    } catch (err) {
      console.log(err);
    }

    loading = false;
  });
</script>

{#if loading}
  <div class="loaderSpinner" />
{:else}
  <ul class="authUser">
    {#if uid}
      <li><a href="/dashboard">dashboard</a></li>
      <li>
        <form action="/api/auth/signout">
          <button type="submit">Sign out</button>
        </form>
      </li>
    {:else}
      <li><a href="/signin" class="loginButton">ログイン</a></li>
    {/if}
  </ul>
{/if}

<style>
  .authUser {
    list-style: none;
    display: flex;
    gap: 1rem;
  }
  .loginButton {
    border-radius: 10px;
    background-color: #348734;
    color: #fff;
    padding: 0.5rem 1rem;
    text-decoration: none;
  }

  .loaderSpinner {
    width: 30px;
    aspect-ratio: 1;
    display: grid;
    border-radius: 50%;
    background: linear-gradient(
          0deg,
          rgb(0 0 0/50%) 30%,
          #0000 0 70%,
          rgb(0 0 0/100%) 0
        )
        50%/8% 100%,
      linear-gradient(90deg, rgb(0 0 0/25%) 30%, #0000 0 70%, rgb(0 0 0/75%) 0)
        50%/100% 8%;
    background-repeat: no-repeat;
    animation: l23 1s infinite steps(12);
  }
  .loaderSpinner::before,
  .loaderSpinner::after {
    content: "";
    grid-area: 1/1;
    border-radius: 50%;
    background: inherit;
    opacity: 0.915;
    transform: rotate(30deg);
  }
  .loaderSpinner::after {
    opacity: 0.83;
    transform: rotate(60deg);
  }
  @keyframes l23 {
    100% {
      transform: rotate(1turn);
    }
  }
</style>
