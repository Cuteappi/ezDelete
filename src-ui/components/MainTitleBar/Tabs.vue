<template>
    <div v-if="Overflowed" class="LArrow" data-tauri-drag-region>
        <div class="leftArrow"
        @click="MoveLeft"
        @mousedown  ="MouseDownMoveLeft"
        @mouseup="ClearTimer"
        @mouseleave="ClearTimer"
        >
            <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.63358 5.43176L1.65626 8.40902C0.781247 9.28403 0.781247 10.7159 1.65626 11.5909L9.06545 19" stroke="#ABA9A9" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.06672 1L7.88489 2.18183" stroke="#ABA9A9" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    </div>
    <div data-tauri-drag-region class="Tabs-Holder">
        <draggable
            class="Tabs-List"
            v-model="TabsArray" 
            group="Tabs"
            @start="onStart"
            @end="onEnd"
            drag-class="drag"
            ghost-class="ghost"
            :force-fallback="true"
            item-key="id"
            :animation="200"
            
        >
            <template #item="{element}" >

                <div class="TabsNDivider">
                    <div
                        :class = "CurrentIndex === element.index ? 'Tab active' : 'Tab Hover' "
                        @click = "setCurrentIndex(element.index)"
                    >
                        <div>
                            {{ element.name }}
                        </div>
                        <template v-if="TabsArray.length !== 1">
                            <div class="Close-Container"
                                @click="DeleteTab(element.index)"
                            >
                                <div class="Close">
                                    <svg class="Close-Svg" width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.7737 0L0 0.7737L4.7263 5.5L0 10.2263L0.7737 11L5.5 6.2737L10.2263 11L11 10.2263L6.2737 5.5L11 0.7737L10.2263 0L5.5 4.7263L0.7737 0Z" fill="#ABA9A9"/>
                                    </svg>
                                </div>
                            </div>
                        </template>
                    </div>
                    <template v-if = "CheckIfToPutDivider(element.index)">
                        <div class="Divider"/>
                    </template>
                </div>               
            </template>
        </draggable>
        <div :class="Overflowed ? 'Tabs-Holder-Add Hidden' : 'Tabs-Holder-Add' ">
            <div 
            class="Tabs-Holder-Add-Button"
            @click="AddTabHandler"
            
            >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path id="Vector" d="M7.56843 0.497353H6.57372L6.57372 6.57371L0.497362 6.57371L0.497361 7.56842L6.57372 7.56842L6.57372 13.6448H7.56843L7.56843 7.56842L13.6448 7.56842L13.6448 6.57371L7.56843 6.57371L7.56843 0.497353Z" fill="#ABA9A9"/>
                </svg>
            </div>
        </div>

        
    </div>
    <div v-if="Overflowed" class="RArrow" data-tauri-drag-region>
        <div class="rightArrow"
        @click="MoveRight"
        @mousedown="MouseDownMoveRight"
        @mouseup="ClearTimer"
        @mouseleave="ClearTimer"
        >
            <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.4335 5.43179L8.41082 8.40907C9.28583 9.28409 9.28583 10.7159 8.41082 11.5909L1.00163 19.0002" stroke="#ABA9A9" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1.00018 1L2.18201 2.18184" stroke="#ABA9A9" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    </div>

    <div :class="Overflowed ? 'Tabs-Holder-Add Position' : 'Tabs-Holder-Add Hidden'" data-tauri-drag-region>
            <div 
            class="Tabs-Holder-Add-Button"
            @click="AddTabHandler"
            >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path id="Vector" d="M7.56843 0.497353H6.57372L6.57372 6.57371L0.497362 6.57371L0.497361 7.56842L6.57372 7.56842L6.57372 13.6448H7.56843L7.56843 7.56842L13.6448 7.56842L13.6448 6.57371L7.56843 6.57371L7.56843 0.497353Z" fill="#ABA9A9"/>
                </svg>
            </div>
        </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import { appWindow } from '@tauri-apps/api/window';

const TabsStore = useTabsStore();
const { setTabsArray, setCurrentIndex, AddTab, DeleteTab, setOverflowed } = TabsStore;
const { TabsArray, CurrentIndex, Overflowed } = storeToRefs(TabsStore);

const resized = ref(0);

const tabWidth = ref(240 * TabsArray.value.length);

const HolderWidth = ref(240 * TabsArray.value.length);


appWindow.onResized(
    debounce(()=>{
        const content = document.querySelector(".Tabs-Holder");
        const List = document.querySelector(".Tabs-List");
        if(!content || !List) return;
        HolderWidth.value = content.clientWidth;
        tabWidth.value  = List.clientWidth;
        resized.value += 1;
    },100)
);


watch(TabsArray.value,()=>{
    let content = document.querySelector(".Tabs-Holder");
    let List = document.querySelector(".Tabs-List");
    if(!content || !List) return;
    HolderWidth.value = content.clientWidth;
    tabWidth.value  = 240 * TabsArray.value.length;
})

watch(tabWidth,()=>{

    const content : HTMLElement| null = document.querySelector(".Tabs-Holder");
    const TabsList : HTMLElement| null = document.querySelector(".Tabs-List");
    if (!TabsList || !content) return;

    if(tabWidth.value > HolderWidth.value){
        setOverflowed(true);
        content.style.maxWidth = "calc(100dvw - ( 144px + 68px + 46px + 46px ))";
        TabsList.style.maxWidth = "calc(100dvw - ( 144px + 68px + 46px + 46px ))";

    } else {
        setOverflowed(false);
        content.style.maxWidth = "calc(100dvw - 144px)"
        TabsList.style.maxWidth = "calc(100dvw - 144px)"
    }
})

watch(resized,()=>{
    const content : HTMLElement | null = document.querySelector(".Tabs-Holder");
    const TabsList : HTMLElement | null = document.querySelector(".Tabs-List");
    const Active : HTMLElement | null = document.querySelector(".active");
    if (!TabsList || !Active || !content) return;

    if(tabWidth.value > HolderWidth.value){
        setOverflowed(true);
        content.style.maxWidth = "calc(100dvw - ( 144px + 68px + 46px + 46px ))";
        TabsList.style.maxWidth = "calc(100dvw - ( 144px + 68px + 46px + 46px ))";
        Active.scrollIntoView({inline: "start"});

    } else {
        setOverflowed(false);
        content.style.maxWidth = "calc(100dvw - 144px)"
        TabsList.style.maxWidth = "calc(100dvw - 144px)"
    }
})

function AddTabHandler(){
    let List = document.querySelector(".Tabs-List");
    let content = document.querySelector(".Tabs-Holder");
    setTimeout(()=>{
        if(!content || !List ) return;
        content.scrollLeft = List.scrollWidth;
    },0)
    AddTab();
}

function onStart(evt: any){
    setCurrentIndex(evt.oldIndex);
}

function onEnd(evt: any){
    setTabsArray();
    setCurrentIndex(evt.newIndex);
}

function MoveLeft(){
    let content = document.querySelector(".Tabs-Holder");
    if(!content) return;
    content.scrollLeft -= 100;
}

function MoveRight(){
    let content = document.querySelector(".Tabs-Holder");
    if(!content) return;
    content.scrollLeft += 100;
}

let timer: ReturnType<typeof setInterval>;

function ClearTimer(){
    timer && clearInterval(timer);
}

function MouseDownMoveLeft(){
    let content = document.querySelector(".Tabs-Holder");
    timer = setInterval(()=>{
        if(!content) return;
        content.scrollLeft -= 140;

    },200);
}

function MouseDownMoveRight(){
    let content = document.querySelector(".Tabs-Holder");
    timer = setInterval(()=>{
        if(!content) return;
        content.scrollLeft += 140;

    },200);
}

function CheckIfToPutDivider(index: number) : boolean{
    if(CurrentIndex.value - 1 === index) return false;
    if(CurrentIndex.value === index) return false;
    return true;
}

</script>

<style scoped lang="scss">
.Tabs-Holder{
    overflow-x: hidden;
    scroll-behavior: smooth;
    display: flex;
    flex-grow: 1;

    & .Tabs-List {
        display: flex;
        align-self: flex-end;
        max-width: calc(100dvw - 144px);

        & .TabsNDivider{
            display: flex;

            & .Tab {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 240px;
                height: 40px;
                border-radius: 9px 9px 0px 0px;
                padding-left: 17px;
                padding-right: 8px;


                & .Close-Container{
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    & .Close {
                        padding: 3.3px 7px 3.3px 7px;
                        border-radius: 4px;

                        &:hover{
                            background-color: rgba(255, 255, 255, 0.123);
                        }

                        &-Svg {
                            transform: scale(1.1);
                        }
                    }
                }
            }

            & .Hover:hover{
                background-color: rgba(54, 54, 54, 0.174);
            }

            & .active {
                background: var(--TabBackgroundColor);
            }

            & .Divider{
                width: 1px;
                height: 30px;
                background-color: rgba(50, 50, 50, 0.457);
                align-self: center;
            }
        }        
    }

    &-Add {
        display: flex;
        height: 40px;
        align-self: flex-end;
        align-items: center;
        padding-left: 8px;

        &-Button{
            height: 30px;
            aspect-ratio: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 25px;
            background: var(--TabBackgroundColor);
        }
    }
}

.LArrow, .RArrow{
    display: flex;
    align-self: flex-end;
    height: 40px;
    align-items: center;
    background-color: var(--TitleBarBackgroundColor);
    padding-right: 10px;
        
}

.RArrow{
    padding-right:  0px;
    padding-left: 10px; 
    border-radius: 0 0 0 9px;
}

.rightArrow, .leftArrow {
    display: flex;
    align-items: center;
    padding: 5px 12.5px 5px 12.5px;
    border-radius: 4px;

    &:hover{
        background-color: rgba(255, 255, 255, 0.123);
    }
        
}

.Hidden{
    display: none;
}

.Position {
    background-color: var(--TitleBarBackgroundColor);
    padding-right: 30px;
}

.drag {
    opacity: 0.1;
    background-color: rgba(44, 43, 43, 0.731);
    border-radius: 9px 9px 0px 0px;
}

.ghost{
    background-color: var(--PrimaryBackgroundColor);
    border-radius: 9px 9px 0px 0px;
}

.ghost > div {
    visibility: hidden;
}
</style>