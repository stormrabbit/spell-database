const es = require('eschew-materials');

const readDatas = async () => await es.fsTools.readFilePlus('./mock/全法术列表-表格 1.csv');
const buildRelation = (condition, value, name) => (!!condition) ? [{
    spell_name: value,
    class_name: name
}] : [];
const main = async () => {
    const resources = await readDatas();
    const parseFirst = resources.split('\"').join('').split('\r\n');
    const columNames = parseFirst[0].split(',');
    const parseSecond = parseFirst.filter((pf, index) => (index !== 0 && index !== (parseFirst.length - 1))).map(pf => {
        const singleColumns = pf.split(',');
        return singleColumns.reduce((pre, cur, index) => {
            pre[columNames[index]] = cur;
            return pre;
        }, {})
    })
    const parseThird = parseSecond.map(ps => {
        const obj = {};
        const names =  (ps['法术名称'] + '').split(' ');
        obj.lvl = (ps['等级']  + '')
        obj.nickname =names[names.length -1];
        obj.name = (ps['法术名称'] + '').replace(obj.nickname, '').split(' ').filter(tm => !!tm).map(tm => tm.toLocaleLowerCase()).join('_');
        obj.school = (ps['派系'] + '');
        obj.time = (ps['施法时间'] + '');
        obj.range = (ps['施法距离'] + '');
        obj.material = (ps['施法材料'] + '');
        obj.describe = (ps['法术说明'] + '');
        obj.upgrade = (ps['法术升阶'] + '');
        return obj;
    })

    const parseForth = parseSecond.reduce((pre, cur) => {
        const nickname = cur['法术名称'] + '';
        const tempLine = nickname.split(' ');
        const name = tempLine.filter( (val, index) => (index !== (tempLine.length -1))).filter(tm => !!tm).map(tm => tm.toLocaleLowerCase()).join('_');
        const band = cur['诗人'] + '';
        const cleric = cur['牧师'] + '';
        const druid = cur['德鲁伊'] + '';
        const paladin = `${cur['圣武士']}`;
        const ranger = `${cur['游侠']}`;
        const sorcerer = `${cur['术士']}`;
        const warlock = `${cur['邪术士']}`;
        const wizard = `${cur[`法师`]}`;
        return [
            ...pre,
            ...buildRelation(band, name, 'band'),
            ...buildRelation(cleric, name, 'cleric'),
            ...buildRelation(druid, name, 'druid'),
            ...buildRelation(paladin, name, 'paladin'),
            ...buildRelation(ranger, name, 'ranger'),
            ...buildRelation(sorcerer, name, 'sorcerer'),
            ...buildRelation(warlock, name, 'warlock'),
            ...buildRelation(wizard, name, 'wizard')
        ];
    }, []);

    const buildClass = (name, nickname) => ({
        name,
        nickname
    });
    const classes = [
        buildClass('band', '吟游诗人'),
        buildClass('cleric', '牧师'),
        buildClass('druid', '德鲁伊'),
        buildClass('paladin', '圣骑士'),
        buildClass('ranger', '游侠'),
        buildClass('sorcerer', '术士'),
        buildClass('warlock', '邪术师'),
        buildClass('wizard', '法师')
    ];

    // const classes = 
    await es.fsTools.writeFilePlus('./mock/spells.json', JSON.stringify(parseThird), false);
    await es.fsTools.writeFilePlus('./mock/spells_classes.json', JSON.stringify(parseForth), false);
    await es.fsTools.writeFilePlus('./mock/classes.json', JSON.stringify(classes), false);
    // console.log(parseForth);
}

main();