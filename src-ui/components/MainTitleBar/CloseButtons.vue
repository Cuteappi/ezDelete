<template>
    <div class="CloseWindowButtonsBox">
        <div class="CloseWindowButtons">
            <div class="WindowButton Minimize"
                @click='MinimizeWindow()'
                >
                <svg width="11" height="3" viewBox="0 0 11 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0.487183H11V2.26856H0V0.487183Z" fill="#ABA9A9"/>
                </svg>
            </div>
            <div class="WindowButton Maximize"
                @click='MaximizeWindow()'
            >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 11H11V0H0V11ZM1.83333 9.16667V1.83333H9.16667V9.16667H1.83333Z" fill="#ABA9A9"/>
                </svg>
            </div>
            <div class="WindowButton Close"
                @click='CloseWindow()'
            >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="Close-Path" d="M0.7737 0L0 0.7737L4.7263 5.5L0 10.2263L0.7737 11L5.5 6.2737L10.2263 11L11 10.2263L6.2737 5.5L11 0.7737L10.2263 0L5.5 4.7263L0.7737 0Z" fill="#ABA9A9"/>
                </svg>
            </div>
            
        </div>

        <div data-tauri-drag-region class="MoveWindow"/>
    </div>
    
</template>

<script setup lang="ts">
import { appWindow } from '@tauri-apps/api/window';

const MinimizeWindow = () => appWindow.minimize();
const MaximizeWindow = () => appWindow.toggleMaximize();
const CloseWindow = () => appWindow.close();

</script>

<style scoped lang="scss">
.CloseWindowButtonsBox{
    // position: absolute;
    // top: 0;
    // right: 0;
    background-color: var(--TitleBarBackgroundColor);
    display: flex;
    flex-direction: column;

    & .CloseWindowButtons {
        // position:absolute;
        // top: 0;
        // right: 0;
        display:flex;
        flex-direction: row;
        height: 40px;

        & .WindowButton {
            width: 48px; 
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        & .Minimize, .Maximize{
            &:hover{
                background-color:rgba(92, 92, 92, 0.324);
            }
        }

        & .Close:hover{
            background-color:rgb(255, 0, 0);
            .Close-Path{
                fill:azure;
            }
        }
    }

    & .MoveWindow{
        height: 10px;
        flex-grow: 1;
    }
}
</style>