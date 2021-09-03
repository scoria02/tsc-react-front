export const updataError = (array: any, item: any) => {
	const index: number = array.findIndex((i: any) => i.name === item.name);
	if(index !== -1){
		array.splice(index, 1);
		return array.concat([item]);
	} 
	else return array.concat([item]);
};

export const deleteError = (array: any, item: string) => {
	const index: number = array.findIndex((i: any) => i.name === item)
	if(index !== -1) {
		array.splice(index, 1);
		return array;
	}
	return array;
};
