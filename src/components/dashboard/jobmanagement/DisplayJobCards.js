// module imports
import React from 'react';
import FlexView from 'react-flexview';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

// local imports

// style imports

const styles = theme => ({
  root: {
    paddingTop: 32
  }
});

/**
 *
 * @param {object[]} jobs Array of job objects to be displayed
 */
const DisplayJobCards = props => {
  const { jobs, classes, onOpenDialog } = props;

  const renderJobCards = () => {
    let jobList = [];
    jobs.forEach(job => {
      if (job.is_active) {
        jobList.push(
          <Card key={job.job_id}>
            <CardContent>
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
                <strong>Compensation and Benefits:</strong>{' '}
                {job.compensation_benefits}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="secondary"
                onClick={onOpenDialog.bind(this, job)}
              >
                Edit Details
              </Button>
            </CardActions>
          </Card>
        );
      }
    });
    return jobList;
  };

  return (
    <FlexView column shrink className={classes.root}>
      {renderJobCards()}
    </FlexView>
  );
};

export default withStyles(styles, { withTheme: true })(DisplayJobCards);
