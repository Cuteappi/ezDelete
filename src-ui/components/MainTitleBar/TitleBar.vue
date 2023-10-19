
<template>
    <div class="TitleBar" data-tauri-drag-region>
        <div class="Home-Icon-Container" data-tauri-drag-region>
            <div class="Home-Icon-Holder">
                <svg class="Home-Icon" width="20" height="19" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
                    <path id="Vector" d="M10 0L9.47608 0.514145L0 10.2362L1.04784 11.3112L1.98178 10.353V19H8.54214V11.5215H11.4579V19H18.0182V10.353L18.9522 11.3112L20 10.2362L10.5239 0.514145L10 0ZM10 2.12669L16.5604 8.85732V17.5043H12.9157V10.0258H7.08428V17.5043H3.43964V8.85732L10 2.12669Z" fill="#ABA9A9"/>
                </svg>
            </div>
        </div>

        <ClientOnly>
            <Tabs />
            <CloseButtons/>
        </ClientOnly>
    </div>

</template>

<style scoped lang="scss">

.TitleBar{
    display:flex;
    height:50px;
    width:100dvw;
    background-color: var(--TitleBarBackgroundColor);
        
    & .Home-Icon-Container {
        padding: 10px;
        & .Home-Icon-Holder{
            height: 30px;
            width: 30px;
            padding: 5px;

            & .Home-Icon{
                fill:var(--PrimaryTextColor);

            }

            &:hover{
                transition: all 100ms;
                transform: scale(1.05);
                
            }
        }
    }
}

</style>