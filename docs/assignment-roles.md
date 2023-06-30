# Canvas Assignments
The canvas assignments must be "online_url". Our tool will automatically back propagate the submission status to canvas by adding the URL of our tool to the submission of the student. The submission data is saved on our tool, such as the PDF file.

This is because we chose to use the API version of canvas and not the LTI version. LTI is the version that is used by CodeGrade, here the tool is connected to one assignment. With the API version, the tool is not limited to only one assignment.

We did not use the "launch external tool" button that tools like eJournal use because we thought it was impossible to do since we only succeeded in fully using the canvas API at the end of week 3 by sending 80+ emails to Gerrit Oomens, so we would not have enough time left.

## User roles on the canvas test environment
Our tool uses the test environment of the canvas API. Unfortunately, the test environment does not allow students any access on the test environment. For example, a student only sees "Access denied" on a course on the test environment. So, we had to think of a creative solution to fix this because only student roles can submit assignments unfortunately. As a result, we found out that you could have multiple roles on canvas, and we made the decision to make students on the test environment TA and Student role. This is because the TA role allows access to the test environment and prevents the "Access denied" error from the setting of the test environment, and the Student role allows for submissions on assignments. However, this is only an issue on the test environment. So, if the tool is used on the production environment of canvas this will not be an issue since students will have access to that environment.

In summary, these are the two roles on our tool:
- Teacher on our tool: teacher role on the canvas test environment course.
- Student on our tool: TA and student role on the canvas test environment course.