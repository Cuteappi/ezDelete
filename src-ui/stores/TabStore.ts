
type TabsArrayStruct = {
    name:string,
    index:number,
};

export const useTabsStore = defineStore('alerts', () => {

    const TabsArray = ref<TabsArrayStruct[]>([{name: "Home", index: 0}]);
    const CurrentIndex = ref(0);

    function setCurrentIndex(index: number){
        CurrentIndex.value = index;
    }

    function setTabsArray( oldIndex: number, newIndex : number){
        TabsArray.value[oldIndex].index = oldIndex;
        TabsArray.value[newIndex].index = newIndex;
    }

    function AddTab(){
        const index = TabsArray.value[TabsArray.value.length - 1].index + 1;
        const newTab = {name: "Home", index};
        TabsArray.value.push(newTab);
        setCurrentIndex(index);
    }

    function DeleteTab(index :number){
        console.log("Deketeing")
        console.log(TabsArray.value);
        TabsArray.value.splice(index,1);
        for(let i = index; i < TabsArray.value.length; i++){
            TabsArray.value[i].index = i;
        }

        setTimeout(()=>{
            if(index === 0) return;
            if(TabsArray.value[index]) setCurrentIndex(index);
            else setCurrentIndex(index - 1);
        },0)
        
    }
    
    return {
        TabsArray,
        CurrentIndex,
        setCurrentIndex,
        setTabsArray,
        AddTab,
        DeleteTab
    }

})