<script lang="ts">
	import { sendAnswerMsg } from "../services/message_send";
	import { current_token } from "../stores/current_user_store";
    import { answers_list, correctAnswers, gameState, question, timer } from "../stores/game_store";
    import { useLanguageStore } from "../stores/language_store";
	import { GameState } from "../types/GameState";

    const langStore = useLanguageStore();
    const langStoreValue = {
		subscribe: langStore.subscribe,
	}

    let selectedAnswer = -1;

    $: switch($gameState) {
        case GameState.Question:
            selectedAnswer = -1;
            break;
    }

    const sendAnswer = (answerNum: number) => {
        sendAnswerMsg({num: answerNum, token: $current_token});
        selectedAnswer = answerNum;
    }

    const getAnswerColor = (num: number, correct: number) => {
        if (num === correct) return "green";
        if (num === selectedAnswer) return "red";
        return "gray";
    }
</script>

{#if $gameState === GameState.Question}
    <div class="question-large">{$question}</div>
{:else if $gameState === GameState.Answers}
    <div class="q-and-a">
        <div class="timer">{$timer}</div>
        <div class="question-small">{$question}</div>
        <div class="answers">
            {#each $answers_list as answer}
                <button class="answer pointer {answer.number === selectedAnswer ? "yellow" : "gray" }" on:click={() => sendAnswer(answer.number)}>
                    {answer.number}: {answer.text}
                </button>
            {/each}
        </div>
    </div>
{:else if $gameState === GameState.CorrectAnswer}
    <div class="q-and-a">
        <div class="question-small">{$question}</div>
        <div class="answers">
            {#each $answers_list as answer}
                <button class="answer {getAnswerColor(answer.number, $correctAnswers.correctAnswer)}">
                    {answer.number}: {answer.text}
                </button>
            {/each}
        </div>
    </div>
{:else}
    <div>{$langStoreValue.waiting}</div>
{/if}

<style>
    .question-large {
        font-size: 4rem;
        font-weight: bold;
        color: var(--text-primary);
    }
    .question-small {
        font-size: 2rem;
        font-weight: bold;
    }
    .q-and-a {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 4rem;
        padding: 4rem;
        width: 100%;
        height: 100%;
        color: var(--text-primary);
    }
    .timer {
        position: absolute;
        top: 4rem;
        left: 1rem;
        color: var(--text-primary);
        font-size: 4rem;
    }
    .answers {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(2, 1fr);
        width: 100%;
    }
    .answer {
        background-color: rgba(108, 108, 108, 0.5);
        border-radius: 1rem;
        border: 2px solid var(--text-primary);
        font-size: 1.5rem;
        font-weight: 200;
        padding: 2rem;
    }
    .pointer {
        cursor: pointer;
    }
    .gray {
        background-color: rgba(108, 108, 108, 0.5);
    }
    .green {
        background-color: rgba(28, 170, 31, 0.5);
    }
    .red {
        background-color: rgba(173, 32, 32, 0.5);
    }
    .yellow {
        background-color: rgba(255, 210, 63, 0.5);
    }
</style>