<script setup lang="ts"></script>

<template>
    <div class="w-full flex items-center justify-center">
        <div class="min-w-md bg-base ring-elevated ring-1 rounded-lg p-4">
            <form class="flex flex-col gap-4">
                <label class="flex flex-col">
                    <span>Username</span>
                    <input type="text" placeholder="Username..." class="outline-none ring-1 focus:ring-2 ring-highlight focus:ring-brand rounded-sm p-1">
                </label>
                <label class="flex flex-col">
                    <span>Password</span>
                    <input type="password" placeholder="Password..." class="outline-none ring-1 focus:ring-2 ring-highlight focus:ring-brand rounded-sm p-1">
                </label>
                <button type="submit" class="bg-brand hover:bg-brand/75 w-full p-2 rounded-sm">
                    Create account
                </button>
            </form>
        </div>
    </div>
</template>