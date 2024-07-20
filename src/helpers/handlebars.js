module.exports = (field, sort) => {
    const queryType = field === sort.column ? sort.type : 'default';
    // từ cái type lấy ra icon và type cho lần bấm tiếp theo
    const icons = {
        default: '<i class="fa-solid fa-sort"></i>',
        asc: '<i class="fa-solid fa-arrow-up-short-wide"></i>',
        desc: '<i class="fa-solid fa-arrow-down-short-wide"></i>',
    };
    const types = {
        default: 'desc',
        desc: 'asc',
        asc: 'desc',
    };
    const icon = icons[queryType];
    const type = types[queryType];
    return `
        <a href="?_sort&column=${field}&type=${type}">${icon}</a>
    `;
};
