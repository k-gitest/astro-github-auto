<script lang="ts">
  import { z } from "zod";

  export let path: string;
  export let title: string;

  let error = "";

  const schema = z.object({
    email: z
      .string()
      .email({ message: "有効なメールアドレスを入力してください" }),
    password: z
      .string()
      .min(6, { message: "パスワードは少なくとも6文字以上で入力してください" }),
  });

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    try {
      const response = await fetch(path, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        window.location.href =
          path === "/api/auth/signin" ? "/dashboard" : "/signin";
      } else {
        error = await response.text();
      }
    } catch (error) {
      error = "リクエストの処理中にエラーが発生しました";
    }
  }

  function handleBlur(event: FocusEvent) {
    const { name, value } = event.target as HTMLInputElement;
    try {
      schema.pick({ [name]: true }).parse({ [name]: value });
      error = "";
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        error = validationError.errors.map((err) => err.message).join("\n");
      } else {
        error = "入力内容が正しくありません";
      }
    }
  }
</script>

<div class="contentWrap">
  <h1>{title}</h1>
  <div>
    <slot />
  </div>
  {#if error}
    <div><p id="error">{error}</p></div>
  {/if}

  <form id="authForm2" on:submit={handleSubmit}>
    <div class="formWrap">
      <label for="authForm2-email"
        ><span>Email</span>
        <input
          type="email"
          name="email"
          id="authForm2-email"
          autocomplete="email"
          required
          on:blur={handleBlur}
        />
      </label>
      <label for="authForm2-password"
        ><span>Password</span>
        <input
          type="password"
          name="password"
          id="authForm2-password"
          autocomplete="current-password"
          required
          on:blur={handleBlur}
        />
      </label>
      <button type="submit">Login</button>
    </div>
  </form>
</div>

<style lang="scss">
  .contentWrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #error {
    margin: 0;
    padding: 0;
    color: red;
  }
  .formWrap {
    max-width: 300px;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.7rem;
    padding: 1rem;

    label {
      margin: 0;
      padding: 0;
    }

    span {
      display: block;
    }

    input {
      width: 100%;
      box-sizing: border-box;
    }

    button {
      max-width: 200px;
      height: 30px;
      cursor: pointer;
    }
  }
</style>
