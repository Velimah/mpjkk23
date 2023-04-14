import {
  Button,
  ButtonGroup,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';
import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';

const MediaRow = ({file, deleteMedia}) => {
  const {user, update, setUpdate} = useContext(MediaContext);

  const doDelete = async () => {
    const sure = confirm('Are you sure?');
    if (sure) {
      const token = localStorage.getItem('token');
      const deleteResult = await deleteMedia(file.file_id, token);
      console.log(deleteResult);
      setUpdate(!update);
    }
  };

  return (
    <ImageListItem>
      <img
        src={
          file.media_type !== 'audio'
            ? mediaUrl + file.thumbnails.w320
            : '/vite.svg'
        }
        alt={file.title}
      />
      <ImageListItemBar
        title={file.title}
        subtitle={file.description}
        sx={{
          '& .MuiImageListItemBar-title': {color: 'White', typography: 'body1'}, // styles for title
          '& .MuiImageListItemBar-subtitle': {
            color: 'White',
            typography: 'body2',
          }, // styles for subtitle
        }}
        actionIcon={
          <ButtonGroup>
            <Button
              sx={{p: 1, m: 1}}
              component={Link}
              variant="contained"
              to="/single"
              state={{file}}
            >
              View
            </Button>
            {file.user_id === user.user_id && (
              <>
                <Button
                  sx={{p: 1, m: 1}}
                  component={Link}
                  variant="contained"
                  to="/modify"
                  state={{file}}
                >
                  Update
                </Button>
                <Button
                  sx={{
                    p: 1,
                    m: 1,
                    backgroundColor: 'red',
                    '&:hover': {
                      backgroundColor: '#C41E3A !important',
                    },
                  }}
                  component={Link}
                  variant="contained"
                  onClick={doDelete}
                >
                  Delete
                </Button>
              </>
            )}
          </ButtonGroup>
        }
      />
    </ImageListItem>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object.isRequired,
  deleteMedia: PropTypes.func.isRequired,
};

export default MediaRow;
