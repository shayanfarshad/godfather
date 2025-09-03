import { useCallback, useMemo } from 'react';
import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { scenariosAction } from 'src/app/store/slices';

export function useRulesLogic() {
  const dispatch = useAppDispatch();
  const premiumActive = useAppSelector(s => s.Premium.active);
  const lang = useAppSelector(s => s.Settings.lang,shallowEqual);
  const source = useAppSelector(s => s.Scenarios.selectedSource);
  const builtins = useAppSelector(s => s.Scenarios.builtins);
  const customs = useAppSelector(s => s.Scenarios.customs);
  const selectedScenarioId = useAppSelector(s => s.Scenarios.selectedScenarioId);

  const list = source === 'builtin' ? builtins : customs;
  const selected = useMemo(() => list.find(s => s.id === selectedScenarioId) ?? list[0], [list, selectedScenarioId]);

  const onTab = useCallback((tab: 'builtin' | 'custom') => {
    dispatch(scenariosAction.selectSource(tab));
  }, [dispatch]);

  const onSelectScenario = useCallback((id: string) => {
    dispatch(scenariosAction.selectScenario(id));
  }, [dispatch]);

  return {
    premiumActive,
    source, list, selected,
    onTab, onSelectScenario,
    lang
  };
}
