import { isObjectNotEmpty } from './utils';

export default function spreadsheetToJsonResume(jsonSpreadsheet) {
    // attribute names
    const categoryAttr = 'category'.toUpperCase();
    const contentAttr = 'content'.toUpperCase();
    const typeAttr = 'type'.toUpperCase();
    const disabledAttr = 'disabled'.toUpperCase();

    // categories
    const basicsCategory = 'basics';
    const basicsLocationCategory = 'basics_location';
    const basicsProfilesCategory = 'basics_profiles';
    const workCategory = 'work';
    const volunteerCategory = 'volunteer';
    const educationCategory = 'education';
    const awardsCategory = 'awards';
    const publicationsCategory = 'publications';
    const certificatesCategory = 'certificates';
    const skillsCategory = 'skills';
    const languagesCategory = 'languages';
    const interestsCategory = 'interests';
    const referencesCategory = 'references';
    const translationsCategory = '__translation__';
    const coverLetterCategory = 'cover_letter';
    const enableSourceDataDownloadCategory = 'enable_download';

    // base jsonResume
    const jsonResume = {
        basics: {
            location: {},
            profiles: [],
        },
        work: [],
        volunteer: [],
        education: [],
        awards: [],
        publications: [],
        certificates: [],
        skills: [],
        languages: [],
        interests: [],
        references: [],
        coverLetter: '',
    };

    let profiles = {};
    const profilesArray = [];
    let work = {};
    const workArray = [];
    let volunteer = {};
    const volunteerArray = [];
    let education = {};
    const educationArray = [];
    let awards = {};
    const awardsArray = [];
    let publications = {};
    const publicationsArray = [];
    let certificates = {};
    const certificatesArray = [];
    let skills = {};
    const skillsArray = [];
    let languages = {};
    const languagesArray = [];
    let interests = {};
    const interestsArray = [];
    let references = {};
    const referencesArray = [];
    const translations = {};
    let coverLetter = '';
    let enableSourceDataDownload = false;

    jsonSpreadsheet.forEach((value) => {
        if (value[disabledAttr]) {
            return;
        }

        const category = value[categoryAttr].toLowerCase();
        if (category === enableSourceDataDownloadCategory) {
            enableSourceDataDownload = value[contentAttr].toLowerCase() === 'true';
        } else if (category === coverLetterCategory) {
            coverLetter = value[contentAttr];
        } else if (category === translationsCategory) {
            translations[value[typeAttr]] = value[contentAttr];
        } else if (category === basicsCategory) {
            jsonResume.basics[value[typeAttr]] = value[contentAttr];
        } else if (category === basicsLocationCategory) {
            jsonResume.basics.location[value[typeAttr]] = value[contentAttr];
        } else if (category === basicsProfilesCategory) {
            if (value[typeAttr] === 'network') {
                if (isObjectNotEmpty(profiles)) {
                    profilesArray.push({ ...profiles });
                    profiles = {};
                }
            }

            profiles[value[typeAttr]] = value[contentAttr];
        } else if (category === workCategory) {
            if (value[typeAttr] === 'company') {
                if (isObjectNotEmpty(work)) {
                    workArray.push({ ...work });
                    work = {};
                }
            }

            if (value[typeAttr] === 'highlights') {
                work[value[typeAttr]] = value[contentAttr].split(',').map((item) => item.trim());
            } else {
                work[value[typeAttr]] = value[contentAttr];
            }
        } else if (category === volunteerCategory) {
            if (value[typeAttr] === 'organization') {
                if (isObjectNotEmpty(volunteer)) {
                    volunteerArray.push({ ...volunteer });
                    volunteer = {};
                }
            }

            if (value[typeAttr] === 'highlights') {
                volunteer[value[typeAttr]] = value[contentAttr].split(',').map((item) => item.trim());
            } else {
                volunteer[value[typeAttr]] = value[contentAttr];
            }
        } else if (category === educationCategory) {
            if (value[typeAttr] === 'institution') {
                if (isObjectNotEmpty(education)) {
                    educationArray.push({ ...education });
                    education = {};
                }
            }

            if (value[typeAttr] === 'courses') {
                education[value[typeAttr]] = value[contentAttr].split(',').map((item) => item.trim());
            } else {
                education[value[typeAttr]] = value[contentAttr];
            }
        } else if (category === awardsCategory) {
            if (value[typeAttr] === 'title') {
                if (isObjectNotEmpty(awards)) {
                    awardsArray.push({ ...awards });
                    awards = {};
                }
            }

            awards[value[typeAttr]] = value[contentAttr];
        } else if (category === certificatesCategory) {
            if (value[typeAttr] === 'name') {
                if (isObjectNotEmpty(certificates)) {
                    certificatesArray.push({ ...certificates });
                    certificates = {};
                }
            }

            certificates[value[typeAttr]] = value[contentAttr];
        } else if (category === publicationsCategory) {
            if (value[typeAttr] === 'name') {
                if (isObjectNotEmpty(publications)) {
                    publicationsArray.push({ ...publications });
                    publications = {};
                }
            }

            publications[value[typeAttr]] = value[contentAttr];
        } else if (category === skillsCategory) {
            if (value[typeAttr] === 'name') {
                if (isObjectNotEmpty(skills)) {
                    skillsArray.push({ ...skills });
                    skills = {};
                }
            }

            if (value[typeAttr] === 'keywords') {
                skills[value[typeAttr]] = value[contentAttr].split(',').map((item) => item.trim());
            } else {
                skills[value[typeAttr]] = value[contentAttr];
            }
        } else if (category === languagesCategory) {
            if (value[typeAttr] === 'language') {
                if (isObjectNotEmpty(languages)) {
                    languagesArray.push({ ...languages });
                    languages = {};
                }
            }

            languages[value[typeAttr]] = value[contentAttr];
        } else if (category === interestsCategory) {
            if (value[typeAttr] === 'name') {
                if (isObjectNotEmpty(interests)) {
                    interestsArray.push({ ...interests });
                    interests = {};
                }
            }

            if (value[typeAttr] === 'keywords') {
                interests[value[typeAttr]] = value[contentAttr].split(',').map((item) => item.trim());
            } else {
                interests[value[typeAttr]] = value[contentAttr];
            }
        } else if (category === referencesCategory) {
            if (value[typeAttr] === 'name') {
                if (isObjectNotEmpty(references)) {
                    referencesArray.push({ ...references });
                    references = {};
                }
            }

            references[value[typeAttr]] = value[contentAttr];
        }
    });

    if (isObjectNotEmpty(profiles)) {
        profilesArray.push(profiles);
    }
    jsonResume.basics.profiles = [...profilesArray];

    if (isObjectNotEmpty(work)) {
        workArray.push(work);
    }
    jsonResume.work = [...workArray];

    if (isObjectNotEmpty(volunteer)) {
        volunteerArray.push(volunteer);
    }
    jsonResume.volunteer = [...volunteerArray];

    if (isObjectNotEmpty(education)) {
        educationArray.push(education);
    }
    jsonResume.education = [...educationArray];

    if (isObjectNotEmpty(awards)) {
        awardsArray.push(awards);
    }
    jsonResume.awards = [...awardsArray];

    if (isObjectNotEmpty(publications)) {
        publicationsArray.push(publications);
    }
    jsonResume.publications = [...publicationsArray];

    if (isObjectNotEmpty(certificates)) {
        certificatesArray.push(certificates);
    }
    jsonResume.certificates = [...certificatesArray];

    if (isObjectNotEmpty(skills)) {
        skillsArray.push(skills);
    }
    jsonResume.skills = [...skillsArray];

    if (isObjectNotEmpty(languages)) {
        languagesArray.push(languages);
    }
    jsonResume.languages = [...languagesArray];

    if (isObjectNotEmpty(interests)) {
        interestsArray.push(interests);
    }
    jsonResume.interests = [...interestsArray];

    if (isObjectNotEmpty(references)) {
        referencesArray.push(references);
    }
    jsonResume.references = [...referencesArray];

    return {
        ...jsonResume,
        __translation__: translations,
        coverLetter,
        enableSourceDataDownload,
    };
}
