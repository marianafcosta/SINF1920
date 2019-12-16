import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import numeral from 'numeral';
import moment from 'moment';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';

import CustomCard from '../CustomCard';

import './TableCard.css';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const EnhancedTableHead = ({
  headers,
  classes,
  order,
  orderBy,
  onRequestSort,
}) => {
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headers.map(({ name, label }) => (
          <TableCell
            key={name}
            align="left"
            padding="default"
            className={classes.head}
            sortDirection={orderBy === name ? order : false}
          >
            <TableSortLabel
              active={orderBy === name}
              direction={order}
              className="labelColor"
              onClick={createSortHandler(name)}
            >
              {label}
              {orderBy === name ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    maxHeight: 'inherit',
  },
  paper: {
    width: '100%',
    boxShadow: 'none',
    backgroundColor: 'inherit',
    maxHeight: 'inherit',
    boxShadow: 'none !important',
  },
  table: {
    minWidth: 'auto',
    backgroundColor: '#262626',
    color: 'white',
    padding: '0 20px',
    maxHeight: 'inherit',
  },
  tableWrapper: {
    maxHeight: 'inherit',
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  head: {
    backgroundColor: '#262626',
    color: 'inherit',
    padding: '7px 3px 7px 1em',
    borderBottom: '1px solid #FFFBA1',
  },
  cells: {
    backgroundColor: '#262626',
    color: 'inherit',
    padding: '7px 3px 7px 1em',
    border: 'none',
    textAlign: 'end',
  },
  pagination: {
    backgroundColor: '#262626',
    color: 'white',
    border: 'none',
  },
}));

const KpiTable = ({ title, overlayInfo, headers, data, error }) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 5;

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const displayCell = (row, name, link, number, date, format) => {
    if (link) {
      return (
        <Link style={{ color: '#fffba1' }} to={`/${link}/${row[name]}`}>
          {row[name]}
        </Link>
      );
    }
    if (number) {
      return <>{numeral(row[name]).format(format || '0.0a')}</>;
    }

    if (date) {
      return <>{moment(row[name]).format('YYYY-MM-DD')}</>;
    }
    return <>{row[name]}</>;
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <CustomCard title={title} overlayInfo={overlayInfo} error={error}>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div className={classes.tableWrapper}>
            <Table
              stickyHeader
              className={classes.table}
              aria-labelledby="tableTitle"
              size="medium"
              aria-label="sticky table"
            >
              <EnhancedTableHead
                headers={headers}
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {stableSort(data, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => {
                    const isItemSelected = isSelected(row.id);
                    return (
                      <TableRow
                        hover
                        onClick={event => handleClick(event, row.id)}
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row[Object.keys(row)[0]]}
                        selected={isItemSelected}
                      >
                        {headers.map(({ name, link, number, date, format }) => (
                          <TableCell key={name} className={classes.cells}>
                            {displayCell(row, name, link, number, date, format)}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && data.length > rowsPerPage && (
                  <TableRow
                    style={{
                      height: 43 * emptyRows,
                      backgroundColor: '#262626',
                    }}
                  >
                    <TableCell style={{ border: 'none' }} colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {data.length > rowsPerPage && (
            <TablePagination
              className={clsx(classes.pagination, 'pagination')}
              rowsPerPageOptions={[]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
            />
          )}
        </Paper>
      </div>
    </CustomCard>
  );
};

KpiTable.defaultProps = {
  error: false,
};

KpiTable.propTypes = {
  title: PropTypes.string.isRequired,
  overlayInfo: PropTypes.string.isRequired,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      link: PropTypes.string,
      number: PropTypes.bool,
    }),
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  error: PropTypes.bool,
};
export default KpiTable;
