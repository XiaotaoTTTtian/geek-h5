import { AppThunkDispatch, RootState } from '@/types/store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
/**
 * @param action the action function that was passed in
 * @param stateName either of the state names in RootState && generic function
 */
// StateName is the name of a generic type variable
// extends  Repersents a generic constraint to follow
// keyof RootState it is used all the keys in the redux state, that is, any of the state names
export const useInitialState = <StateName extends keyof RootState>(
  action: () => void,
  stateName: StateName,
  afterAction = () => {}
): RootState[StateName] => {
  const dispatch = useDispatch<AppThunkDispatch>()
  const state = useSelector((state: RootState) => state[stateName])
  const actionRef = useRef(action)
  const AfterAction = useRef(afterAction)

  useEffect(() => {
    const actionFn = actionRef.current
    const afterActionBack = AfterAction.current
    const loadData = async () => {
      await dispatch(actionFn())
      afterActionBack()
    }
    loadData()
  }, [dispatch])
  return state
}
