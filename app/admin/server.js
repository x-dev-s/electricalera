'use server'
import fs from 'fs';
import { FetchAnalytics } from "./api/fetch-analytics";
import { FetchSeoData, InspectUrl, TestUrl, FetchSitemapList, FetchSitemap } from "./api/fetch-seodata";
import { DataDirPath } from '../../layout';



export async function GetURLTestResponse(url, siteUrl) {
  const data = await TestUrl(url, siteUrl);
  return data;
}

export async function GetPagePerformance(url, res) {
  return fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&strategy=mobile&category=performance&category=accessibility&category=seo&category=best-practices&category=pwa&key=${process.env.PROJECT_API_KEY}`)
    .then((data) => {
      return data.json().then((PSdata) => {
        PSdata = PSdata.lighthouseResult;
        res.performanceScore = PSdata.categories.performance.score;
        res.accessibilityScore = PSdata.categories.accessibility.score;
        res.bestPracticesScore = PSdata.categories['best-practices'].score;
        res.seoScore = PSdata.categories.seo.score;
        res.pwaScore = PSdata.categories.pwa.score;
        res.pageSize = PSdata.audits.diagnostics.details.items[0].totalByteWeight;
        res.pageLoadTime = PSdata.audits.metrics.details.items[0].observedLoad;
        res.cssCount = PSdata.audits.diagnostics.details.items[0].numStylesheets;
        res.jsCount = PSdata.audits.diagnostics.details.items[0].numScripts;
        res.fontCount = PSdata.audits.diagnostics.details.items[0].numFonts;
        res.requestCount = PSdata.audits.diagnostics.details.items[0].numRequests;
        let potentialSizeSavings = 0;
        let potentialTimeSavings = 0;
        // let j = 0;
        let errors = {}
        for (let cat in PSdata.categories) {
          eval(`errors['${cat}'] = {}`);
          for (let auditRef of eval(`PSdata.categories['${cat}'].auditRefs`)) {
            if (auditRef.weight > 0) {

              let id = auditRef.id;
              if (cat == 'performance') {
                eval(`var audit = PSdata.audits["${id}"]`);
                let audit = eval(`PSdata.audits["${id}"]`);
                eval(`res.psdata["${id}"] = {}`);
                // eval(`res.psdata["${id}"].title = audit.title`);
                // eval(`res.psdata["${id}"].description = audit.description`);
                eval(`res.psdata["${id}"].score = audit.score`);
                eval(`res.psdata["${id}"].val = audit.numericValue`);
              }
              if (auditRef.relevantAudits) {
                for (let err of auditRef.relevantAudits) {
                  let result = GetErrors(potentialSizeSavings, potentialTimeSavings, errors, PSdata, cat, err);
                  potentialSizeSavings = result.potentialSizeSavings;
                  potentialTimeSavings = result.potentialTimeSavings;
                  errors = result.errors;
                }
              }
              else {
                let result = GetErrors(potentialSizeSavings, potentialTimeSavings, errors, PSdata, cat, id);
                potentialSizeSavings = result.potentialSizeSavings;
                potentialTimeSavings = result.potentialTimeSavings;
                errors = result.errors;
              }
              // j++;
            }
          }
          if (Object.keys(errors[cat]).length === 0) {
            delete errors[cat];
          }
        }
        res.potentialSizeSavings = potentialSizeSavings;
        res.potentialTimeSavings = potentialTimeSavings;
        res.errors = errors;
        res.psdata.interactive = {
          // title: 'Interactive',
          score: PSdata.audits['interactive'].score,
          val: PSdata.audits['interactive'].numericValue
        }
        return res;
      });
    })
}

export async function GetSitemapsList(siteUrl) {
  const data = await FetchSitemapsList(siteUrl);
  return data;
}

export async function GetSitemap(siteUrl, sitemapUrl) {
  const data = await FetchSitemap(siteUrl, sitemapUrl);
  return data;
}

export async function GetPagesURL() {
  const pages = fs.readFileSync('/Work/Web_development/electricalera/public/sitemap.xml');
  return pages.toString();
}

export async function SaveData(filePath, data) {
  fs.writeFileSync(DataDirPath + filePath, data);
}

export async function GetSavedData(filePath) {
  let doesFileExist = fs.existsSync(DataDirPath + filePath);
  if (!doesFileExist) {
    return false;
  }
  const data = fs.readFileSync(DataDirPath + filePath);
  return data.toString();
}

export async function GetContentFileData(filePath) {}

export async function GetAnalytics(dimensions, metrics, dateRanges, filePath) {
  return GetSavedData(filePath)
    .then((content) => {
      content = JSON.parse(content);
      if (content && content.data.length > 0 && (new Date()).getTime() - (new Date(content.date)).getTime() < 1 * 24 * 60 * 60 * 1000) {
        return content.data;
      }
      else {
        return FetchAnalytics(dimensions, metrics, dateRanges)
          .then((res) => {
            let saveData = { date: new Date().toLocaleDateString('en-CA'), data: res };
            SaveData(filePath, JSON.stringify(saveData));
            return res
          });
      }
    });
}

export async function GetSeoData(domain, startDate, endDate, dimensions, rowLimit, filePath) {
  return GetSavedData(filePath)
    .then((content) => {
      content = JSON.parse(content);
      if (content && content.data.length > 0 && (new Date()).getTime() - (new Date(content.date)).getTime() < 1 * 24 * 60 * 60 * 1000) {
        return content.data;
      }
      else {
        return FetchSeoData(domain, startDate, endDate, dimensions, rowLimit)
          .then((res) => {
            let saveData = { date: new Date().toLocaleDateString('en-CA'), data: res.rows };
            SaveData(filePath, JSON.stringify(saveData));
            return res.rows;
          });
      }
    });
}

export async function GetSiteInspectionResponse(domain, urls, dates) {
  return GetSavedData('/savedData/urlInspectionTableData.json')
    .then((content) => {
      content = JSON.parse(content);
      if (content && content.data.length > 0 && (new Date()).getTime() - (new Date(content.date)).getTime() < 7 * 24 * 60 * 60 * 1000) {
        return content.data;
      }
      else {
        return (async () => {
          let i = 0;
          let saveData = { date: new Date().toLocaleDateString('en-CA'), data: [] };
          for (let url of urls) {
            // if (i > 1) break;
            await InspectUrl(url, domain)
              .then(async (res) => {
                if (res) {
                  res.firstPublished = dates[i];
                  res.psdata = {};
                  await GetPagePerformance(url, res)
                    .then((PSdata) => {
                      console.log('Fetched PSdata')
                      res = PSdata;
                      saveData.data.push(res);
                    });
                }
              });
            i++;
          }
          SaveData('/savedData/urlInspectionTableData.json', JSON.stringify(saveData));
          return saveData.data;
        })();
      }
    });
}
function GetErrors(potentialSizeSavings, potentialTimeSavings, errors, PSdata, cat, err) {
  if (!eval(`errors['${cat}']['${err}']`) && eval(`PSdata.audits["${err}"].hasOwnProperty("details")`)) {
    if (eval(`PSdata.audits["${err}"].details.hasOwnProperty("overallSavingsBytes")`)) {
      potentialSizeSavings += eval(`PSdata.audits["${err}"].details.overallSavingsBytes`);
    }
    if (eval(`PSdata.audits["${err}"].details.hasOwnProperty("overallSavingsMs")`)) {
      potentialTimeSavings += eval(`PSdata.audits["${err}"].details.overallSavingsMs`);
    }
    if (eval(`PSdata.audits["${err}"].details.hasOwnProperty("items")`) && eval(`PSdata.audits["${err}"].details.items.length > 0`)) {

      let errItems = eval(`PSdata.audits["${err}"].details.items`);
      eval(`errors['${cat}']['${err}'] = {title: PSdata.audits["${err}"].title, items: []}`);
      for (let item of errItems) {
        let Item = {};
        for (let key in item) {
          if (typeof item[key] !== 'object' && key !== 'headings') {
            Item[key] = item[key];
          }
          else if (key === 'value' && typeof item[key] === 'object') {
            Item[key] = item[key]['value'];
          }
          else if (item['node'] && item['node']['selector']) {
            Item['selector'] = item['node']['selector'];
            Item['label'] = item['node']['nodeLabel'];
          }
          else if (item['items'] && item['items'].length > 0) {
            for (let i of item['items']) {
              if (i['node'] && i['node']['selector']) {
                Item['selector'] = i['node']['selector'];
                Item['label'] = i['node']['nodeLabel'];
              }
            }

          }
        }
        eval(`errors['${cat}']['${err}'].items.push(Item)`);
      }
      if (eval(`errors['${cat}']['${err}'].items.length === 0`)) {
        eval(`delete errors['${cat}']['${err}']`);
      }
    }
  }
  return { potentialSizeSavings, potentialTimeSavings, errors };
}