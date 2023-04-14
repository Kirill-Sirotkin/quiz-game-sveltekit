<script lang="ts">
	import { goto } from "$app/navigation";
    import Avatar from "../components/Avatar.svelte";
    import AvatarPanel from "../components/AvatarPanel.svelte";
    import InputField from "../components/InputField.svelte";
    import { current_user } from "../stores/current_user_store";

    function handle_avatar_interact(event: { detail: { avatar: any; }; }) {
        selected_avatar = event.detail.avatar;
        choosing_avatar = false;
    }
    function handle_avatar_settings() {
        choosing_avatar = true;
    }
    function submit_form() {
        if (!is_submit_allowed || is_name_empty) {
            alert("Please enter an acceptable name")
            return;
        }

        localStorage.setItem("token", "123");

        current_user.update((user) => user = {id:"4", name:input_text, avatarPath:selected_avatar, isHost:true, userColor:"#DEADFE"} );
        input_disabled = true;
        submit_icon = "⏳";
        console.log("submitting: " + input_text + ", " + selected_avatar);
        setTimeout(() => {
            goto("/123");}, 
            500
        );
    }

    let choosing_avatar = false;
    let selected_avatar = "default.png"
    let input_text:string = "";
    let form_error_message = "";
    let input_disabled = false;

    $: submit_icon = is_submit_allowed ? "➡️" : "❌";

    let is_name_empty = false;
    $: if (input_text === "") {
        is_name_empty = true;
    } else {
        is_name_empty = false;
    }

    let is_name_forbidden = false;
    $: if (input_text.slice(input_text.length - 2) === "xc" ||
        input_text?.slice(input_text?.length - 2) === "hc" ||
        input_text?.slice(input_text?.length - 2) === "hs") {
        is_name_forbidden = true;
    } else {
        is_name_forbidden = false;
    }

    let is_name_too_long = false;
    $: if (input_text?.length > 10) {
        is_name_too_long = true;
    } else {
        is_name_too_long = false;
    }

    let is_submit_allowed = true;
    $: if (is_name_forbidden) {
        form_error_message = "XC is not allowed :)";
        is_submit_allowed = false;
    } else if (is_name_too_long) {
        form_error_message = "Name too long";
        is_submit_allowed = false;
    } else {
        form_error_message = "";
        is_submit_allowed = true;
    }
</script>

{#if !choosing_avatar}
    <div class="form-wrapper">
        <div class="avatar-wrapper">
            <Avatar 
                settings_button={true} 
                avatar_image={selected_avatar} 
                on:settings={handle_avatar_settings}
                --frame-color = "rgb(0, 27, 66)"
            ></Avatar>
        </div>
        <form class="form-submit" on:submit|preventDefault={ submit_form }>
            <InputField 
                bind:input_text
                is_disabled = {input_disabled}
                form_text="Enter your nickname:"
            ></InputField>
            <input disabled={input_disabled} type="submit" value="{submit_icon}" class="submit-button" />
        </form>
        <div class="form-error">{form_error_message}</div>
    </div>
{:else}
    <AvatarPanel on:interact={handle_avatar_interact}></AvatarPanel>
{/if}

<style>
    .form-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .avatar-wrapper {
        height: 8rem;
        width: 8rem;
    }
    .submit-button {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border-radius: 0.25rem;
        border-width: 2px;
        border-style: outset;
        border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
        cursor: pointer;
        width: 2.8rem;
        height: 2.8rem;
        line-height: 2.5rem;
        text-align: center;
        font-size: 2rem;
        background-color: rgba(0, 0, 0, 0.2);
        margin-left: 0.1rem;
        margin-bottom: 0.1rem;
    }
    .submit-button:active {
        border-style: inset;
    }
    .form-submit {
        display: flex;
        align-items: flex-end;
        padding-top: 2rem;
    }
    .form-error {
        align-self: flex-start;
        padding-top: 0.5rem;
        padding-left: 0.1rem;
        color: red;
        font-size: 1rem;
    }
</style>