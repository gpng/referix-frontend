// module imports
import React from 'react';
import FlexView from 'react-flexview';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import Pagination from 'components/jobsearch/Pagination';

// local imports

// style imports

const styles = theme => ({
  root: {
    paddingTop: 32
  },
  chip: {
    margin: 2
  },
  cardContent: {
    paddingBottom: 4
  }
});

/**
 * Displays list of jobs using cards
 * @param {object[]} jobs Array of job objects to be displayed
 * @param {function} onOpenDialog Function to be called to open edit job dialog
 * @param {function} onApply Function to be called for recruiters to apply to job
 * @param {object} paginationProps Props for pagination component
 */
const DisplayJobCards = props => {
  const { jobs, classes, onOpenDialog, paginationProps, onApply } = props;

  const renderChips = compensation_benefits => {
    const list = compensation_benefits.split('|');
    let renderArr = [];
    for (let i = 0; i < list.length; i++) {
      renderArr.push(<Chip key={i} label={list[i]} className={classes.chip} />);
    }
    return renderArr;
  };

  const renderJobCards = () => {
    let jobList = [];
    jobs.forEach(job => {
      if (job.is_active) {
        jobList.push(
          <Card key={job.job_id}>
            <CardContent className={classes.cardContent}>
              <Typography variant="title">{job.job_title}</Typography>
              <Typography variant="subheading">{`${job.job_type} | ${
                job.job_sector
              }`}</Typography>
              <Typography>
                <strong>Salary:</strong> {job.salary}
              </Typography>
              <Typography>
                <strong>Years of Experience</strong> {job.years_of_experience}
              </Typography>
              <Typography>
                <strong>Skills:</strong> {job.skills}
              </Typography>
              <Typography>
                <strong>Compensation and Benefits:</strong>
              </Typography>
              <FlexView grow wrap>
                {renderChips(job.compensation_benefits)}
              </FlexView>
            </CardContent>
            {onOpenDialog && (
              <CardActions>
                <Button
                  size="small"
                  color="secondary"
                  onClick={onOpenDialog.bind(this, job)}
                >
                  Edit Details
                </Button>
              </CardActions>
            )}
            {onApply && (
              <CardActions>
                <Button
                  size="small"
                  color="secondary"
                  onClick={onApply.bind(this, job)}
                >
                  Reserve Job
                </Button>
              </CardActions>
            )}
          </Card>
        );
      }
    });
    return jobList;
  };

  return (
    <FlexView column shrink className={classes.root}>
      {renderJobCards()}
      {paginationProps &&
        paginationProps.total !== 0 && <Pagination {...paginationProps} />}
    </FlexView>
  );
};

export default withStyles(styles, { withTheme: true })(DisplayJobCards);
