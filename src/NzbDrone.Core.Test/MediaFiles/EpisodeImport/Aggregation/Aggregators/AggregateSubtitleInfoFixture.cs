using FluentAssertions;
using NUnit.Framework;
using NzbDrone.Core.MediaFiles;
using NzbDrone.Core.MediaFiles.EpisodeImport.Aggregation.Aggregators;
using NzbDrone.Core.Test.Framework;

namespace NzbDrone.Core.Test.MediaFiles.EpisodeImport.Aggregation.Aggregators
{
    [TestFixture]
    public class AggregateSubtitleInfoFixture : CoreTest<AggregateSubtitleInfo>
    {
        [TestCase("Name (2020)/Season 1/Name (2020) - S01E20 - [AAC 2.0].mkv", "", "Name (2020) - S01E20 - [AAC 2.0].default.eng.forced.ass")]
        [TestCase("Name (2020)/Season 1/Name (2020) - S01E20 - [AAC 2.0].mkv", "", "Name (2020) - S01E20 - [AAC 2.0].eng.default.ass")]
        [TestCase("Name (2020)/Season 1/Name (2020) - S01E20 - [AAC 2.0].mkv", "", "Name (2020) - S01E20 - [AAC 2.0].fra.ass")]
        [TestCase("", "Name (2020)/Season 1/Name (2020) - S01E20 - [AAC 2.0].mkv", "Name (2020) - S01E20 - [AAC 2.0].default.eng.forced.ass")]
        [TestCase("", "Name (2020)/Season 1/Name (2020) - S01E20 - [AAC 2.0].mkv", "Name (2020) - S01E20 - [AAC 2.0].eng.default.ass")]
        [TestCase("", "Name (2020)/Season 1/Name (2020) - S01E20 - [AAC 2.0].mkv", "Name (2020) - S01E20 - [AAC 2.0].fra.ass")]
        public void should_do_basic_parse(string relativePath, string originalFilePath, string path)
        {
            var episodeFile = new EpisodeFile
            {
                RelativePath = relativePath,
                OriginalFilePath = originalFilePath
            };

            var subtitleTitleInfo = Subject.CleanSubtitleTitleInfo(episodeFile, path);

            subtitleTitleInfo.Title.Should().BeNull();
            subtitleTitleInfo.Copy.Should().Be(0);
        }

        [TestCase("Default (2020)/Season 1/Default (2020) - S01E20 - [AAC 2.0].mkv", "Default (2020) - S01E20 - [AAC 2.0].default.eng.forced.ass")]
        [TestCase("Default (2020)/Season 1/Default (2020) - S01E20 - [AAC 2.0].mkv", "Default (2020) - S01E20 - [AAC 2.0].eng.default.ass")]
        [TestCase("Default (2020)/Season 1/Default (2020) - S01E20 - [AAC 2.0].mkv", "Default (2020) - S01E20 - [AAC 2.0].default.eng.testtitle.forced.ass")]
        [TestCase("Default (2020)/Season 1/Default (2020) - S01E20 - [AAC 2.0].mkv", "Default (2020) - S01E20 - [AAC 2.0].testtitle.eng.default.ass")]
        public void should_not_parse_default(string relativePath, string path)
        {
            var episodeFile = new EpisodeFile
            {
                RelativePath = relativePath
            };

            var subtitleTitleInfo = Subject.CleanSubtitleTitleInfo(episodeFile, path);

            subtitleTitleInfo.LanguageTags.Should().NotContain("default");
        }
    }
}
