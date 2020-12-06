import React, {FC, useState, Fragment, ChangeEvent} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {Task, SortType, GroupType} from './types';
import {sortTasks, groupTasks} from './utils';
import mocks from './mocks';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  table: {
    minWidth: 900,
  },
}));

const createTableRowFromTask = (task: Task): JSX.Element => {
  const {id, name, status, customer, performer, final} = task;

  return (
    <TableRow key={id}>
      <TableCell>{id}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>{customer}</TableCell>
      <TableCell>{performer}</TableCell>
      <TableCell>{final.toISOString()}</TableCell>
    </TableRow>
  );
};

const App: FC<{}> = () => {
  const [sortType, setSortType] = useState(SortType.DEFAULT);
  const [groupType, setGroupType] = useState(GroupType.DEFAULT);
  const classes = useStyles();

  const sortedAndGroupedTasks = groupTasks(
      sortTasks(mocks, sortType),
      groupType,
  );

  const onSortTypeChange = (event: ChangeEvent<{value: unknown}>): void => {
    setSortType(event.target.value as SortType);
  };

  const onGroupTypeChange = (event: ChangeEvent<{value: unknown}>): void => {
    setGroupType(event.target.value as GroupType);
  };

  return (
    <>
      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel htmlFor="sort-type">Сортировка</InputLabel>
        <Select
          id="sort-type"
          value={sortType}
          label="Сортировка"
          onChange={onSortTypeChange}>
          <MenuItem value={SortType.DEFAULT}>По умолчанию</MenuItem>
          <MenuItem value={SortType.TO_HIGH_ID}>По номеру ⬇️</MenuItem>
          <MenuItem value={SortType.TO_LOW_ID}>По номеру ⬆️</MenuItem>
          <MenuItem value={SortType.TO_HIGH_NAME}>По названию ⬇️</MenuItem>
          <MenuItem value={SortType.TO_LOW_NAME}>По названию ⬆️</MenuItem>
          <MenuItem value={SortType.TO_HIGH_STATUS}>По статусу ⬇️</MenuItem>
          <MenuItem value={SortType.TO_LOW_STATUS}>По статусу ⬆️</MenuItem>
          <MenuItem value={SortType.TO_HIGH_CUSTOMER}>По заказчику ⬇️</MenuItem>
          <MenuItem value={SortType.TO_LOW_CUSTOMER}>По заказчику ⬆️</MenuItem>
          <MenuItem value={SortType.TO_HIGH_PERFORMER}>По исполнителю ⬇️</MenuItem>
          <MenuItem value={SortType.TO_LOW_PERFORMER}>По исполнителю ⬆️</MenuItem>
          <MenuItem value={SortType.TO_HIGH_FINAL}>По дедлайну ⬇️</MenuItem>
          <MenuItem value={SortType.TO_LOW_FINAL}>По дедлайну ⬆️</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel htmlFor="group-type">Группировка</InputLabel>
        <Select
          id="group-type"
          value={groupType}
          label="Группировка"
          onChange={onGroupTypeChange}>
          <MenuItem value={GroupType.DEFAULT}>По умолчанию</MenuItem>
          <MenuItem value={GroupType.STATUS}>По статусу</MenuItem>
          <MenuItem value={GroupType.CUSTOMER}>По заказчику</MenuItem>
          <MenuItem value={GroupType.PERFORMER}>По исполнителю</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Номер</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Заказчик</TableCell>
              <TableCell>Исполнитель</TableCell>
              <TableCell>Дедлайн</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupType === GroupType.DEFAULT ? (
              sortedAndGroupedTasks.group.map(createTableRowFromTask)
            ) : (
              Object.entries(sortedAndGroupedTasks).map(([group, tasks]) => (
                <Fragment key={group}>
                  <TableRow>
                    <TableCell colSpan={6}>{group}</TableCell>
                  </TableRow>
                  {tasks.map(createTableRowFromTask)}
                </Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

    </>
  );
};

export default App;
