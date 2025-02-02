import PropTypes from 'prop-types';
import React from 'react';
import RelativeDateCell from 'Components/Table/Cells/RelativeDateCell';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import TableSelectCell from 'Components/Table/Cells/TableSelectCell';
import TableRow from 'Components/Table/TableRow';
import episodeEntities from 'Episode/episodeEntities';
import EpisodeSearchCell from 'Episode/EpisodeSearchCell';
import EpisodeStatus from 'Episode/EpisodeStatus';
import EpisodeTitleLink from 'Episode/EpisodeTitleLink';
import SeasonEpisodeNumber from 'Episode/SeasonEpisodeNumber';
import SeriesTitleLink from 'Series/SeriesTitleLink';
import styles from './MissingRow.css';

function MissingRow(props) {
  const {
    id,
    episodeFileId,
    series,
    seasonNumber,
    episodeNumber,
    absoluteEpisodeNumber,
    sceneSeasonNumber,
    sceneEpisodeNumber,
    sceneAbsoluteEpisodeNumber,
    unverifiedSceneNumbering,
    airDateUtc,
    title,
    isSelected,
    columns,
    onSelectedChange
  } = props;

  if (!series) {
    return null;
  }

  return (
    <TableRow>
      <TableSelectCell
        id={id}
        isSelected={isSelected}
        onSelectedChange={onSelectedChange}
      />

      {
        columns.map((column) => {
          const {
            name,
            isVisible
          } = column;

          if (!isVisible) {
            return null;
          }

          if (name === 'series.sortTitle') {
            return (
              <TableRowCell key={name}>
                <SeriesTitleLink
                  titleSlug={series.titleSlug}
                  title={series.title}
                />
              </TableRowCell>
            );
          }

          if (name === 'episode') {
            return (
              <TableRowCell
                key={name}
                className={styles.episode}
              >
                <SeasonEpisodeNumber
                  seasonNumber={seasonNumber}
                  episodeNumber={episodeNumber}
                  absoluteEpisodeNumber={absoluteEpisodeNumber}
                  seriesType={series.seriesType}
                  alternateTitles={series.alternateTitles}
                  sceneSeasonNumber={sceneSeasonNumber}
                  sceneEpisodeNumber={sceneEpisodeNumber}
                  sceneAbsoluteEpisodeNumber={sceneAbsoluteEpisodeNumber}
                  unverifiedSceneNumbering={unverifiedSceneNumbering}
                />
              </TableRowCell>
            );
          }

          if (name === 'episodes.title') {
            return (
              <TableRowCell key={name}>
                <EpisodeTitleLink
                  episodeId={id}
                  seriesId={series.id}
                  episodeEntity={episodeEntities.WANTED_MISSING}
                  episodeTitle={title}
                  showOpenSeriesButton={true}
                />
              </TableRowCell>
            );
          }

          if (name === 'episodes.airDateUtc') {
            return (
              <RelativeDateCell
                key={name}
                date={airDateUtc}
              />
            );
          }

          if (name === 'status') {
            return (
              <TableRowCell
                key={name}
                className={styles.status}
              >
                <EpisodeStatus
                  episodeId={id}
                  episodeFileId={episodeFileId}
                  episodeEntity={episodeEntities.WANTED_MISSING}
                />
              </TableRowCell>
            );
          }

          if (name === 'actions') {
            return (
              <EpisodeSearchCell
                key={name}
                episodeId={id}
                seriesId={series.id}
                episodeTitle={title}
                episodeEntity={episodeEntities.WANTED_MISSING}
                showOpenSeriesButton={true}
              />
            );
          }

          return null;
        })
      }
    </TableRow>
  );
}

MissingRow.propTypes = {
  id: PropTypes.number.isRequired,
  episodeFileId: PropTypes.number,
  series: PropTypes.object.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  episodeNumber: PropTypes.number.isRequired,
  absoluteEpisodeNumber: PropTypes.number,
  sceneSeasonNumber: PropTypes.number,
  sceneEpisodeNumber: PropTypes.number,
  sceneAbsoluteEpisodeNumber: PropTypes.number,
  unverifiedSceneNumbering: PropTypes.bool.isRequired,
  airDateUtc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectedChange: PropTypes.func.isRequired
};

export default MissingRow;
