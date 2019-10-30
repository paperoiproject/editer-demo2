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












  