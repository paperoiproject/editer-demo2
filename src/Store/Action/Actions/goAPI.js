export const ScenarioLoadAction = () => {
    return {
        type: 'SCENARIOLOAD',
    }
};

export const ScenarioLoadedAction = (scenario_list) => {
    return {
      type: 'SCENARIOLOADED',
      scenario_list: scenario_list
    }
};

export const ScenesLoadAction = () => {
    return {
        type: 'SCENESLOAD',
    }
};

export const ScenesLoadedAction = (scenes_list) => {
    return {
        type: 'SCENESLOADED',
        scenes_list: scenes_list
    }
};

export const ScenarioMakeAction = (formData) => {
    return {
        type: 'SCENARIOMAKE',
        formData: formData
    }
};

export const ScenarioMakedAction = (check) => {
    return {
        type: 'SCENARIOMAKED',
        check: check
    }
};

export const ScenarioUpdateAction = (formData) => {
    return {
        type: 'SCENARIOUPDATE',
        formData: formData
    }
};

export const ScenarioDeleteAction = (formData) => {
    return {
        type: 'SCENARIODELETE',
        formData: formData
    }
};

export const TimeTableLoadAction = () => {
    return {
        type: 'TIMETABLELOADACTION',
    }
};

export const TimeTableLoadedAction = (res) => {
    return {
        timeTable: res,
        type: 'TIMETABLELOADEDACTION',
    }
};

export const TimeTableUpdateAction = (formData) => {
    return {
        type: 'TIMETABLEUPDATEACTION',
        formData: formData
    }
};

export const TimeTableChangeAction = (arr) => {
    return {
        type: 'TIMETABLECHANGEACTION',
        new_arr: arr
    }
};

export const PaperoSendAction = (formData) => {
    return {
        type: 'PAPEROSENDACTION',
    }
};



export const PaperoAction = (formData) => {
    return {
        type: 'PAPEROACTION',
        formData: formData
    }
};

export const PaperoActioned = (res) => {
    return {
        type: 'PAPEROACTIONED',
    }
};

























  