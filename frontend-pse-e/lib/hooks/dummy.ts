export interface Course {
    id: number;
    name: string;
    account_id: number;
    uuid: string;
    start_at: string | null;
    grading_standard_id: number | null;
    is_public: boolean;
    created_at: string;
    course_code: string;
    default_view: string;
    root_account_id: number;
    enrollment_term_id: number;
    license: string;
    grade_passback_setting: string | null;
    end_at: string | null;
    public_syllabus: boolean;
    public_syllabus_to_auth: boolean;
    storage_quota_mb: number;
    is_public_to_auth_users: boolean;
    homeroom_course: boolean;
    course_color: string | null;
    friendly_name: string | null;
    apply_assignment_group_weights: boolean;
    calendar: {
        ics: string;
    };
    time_zone: string;
    blueprint: boolean;
    template: boolean;
    enrollments: Enrollment[];
    hide_final_grades: boolean;
    workflow_state: string;
    restrict_enrollments_to_course_dates: boolean;
}

export interface Enrollment {
    type: string;
    role: string;
    role_id: number;
    user_id: number;
    enrollment_state: string;
    limit_privileges_to_course_section: boolean;
}

export interface Assignment {
    id: number;
    description: string;
    due_at: string;
    unlock_at: string;
    lock_at: string;
    points_possible: number;
    grading_type: string;
    assignment_group_id: number;
    grading_standard_id: number | null;
    created_at: string;
    updated_at: string;
    peer_reviews: boolean;
    automatic_peer_reviews: boolean;
    position: number;
    grade_group_students_individually: boolean;
    anonymous_peer_reviews: boolean;
    group_category_id: number | null;
    post_to_sis: boolean;
    moderated_grading: boolean;
    omit_from_final_grade: boolean;
    intra_group_peer_reviews: boolean;
    anonymous_instructor_annotations: boolean;
    anonymous_grading: boolean;
    graders_anonymous_to_graders: boolean;
    grader_count: number;
    grader_comments_visible_to_graders: boolean;
    final_grader_id: number | null;
    grader_names_visible_to_final_grader: boolean;
    allowed_attempts: number;
    annotatable_attachment_id: number | null;
    hide_in_gradebook: boolean;
    lock_info: {
      lock_at: string;
      can_view: boolean;
      asset_string: string;
    };
    secure_params: string;
    lti_context_id: string;
    course_id: number;
    name: string;
    submission_types: string[];
    has_submitted_submissions: boolean;
    due_date_required: boolean;
    max_name_length: number;
    in_closed_grading_period: boolean;
    graded_submissions_exist: boolean;
    is_quiz_assignment: boolean;
    can_duplicate: boolean;
    original_course_id: number | null;
    original_assignment_id: number | null;
    original_lti_resource_link_id: number | null;
    original_assignment_name: string | null;
    original_quiz_id: number | null;
    workflow_state: string;
    important_dates: boolean;
    external_tool_tag_attributes: {
      url: string;
      new_tab: boolean;
      resource_link_id: string;
      external_data: string;
      content_type: string;
      content_id: number;
      custom_params: null;
    };
    muted: boolean;
    html_url: string;
    url: string;
    published: boolean;
    only_visible_to_overrides: boolean;
    locked_for_user: boolean;
    lock_explanation: string;
    submissions_download_url: string;
    post_manually: boolean;
    anonymize_students: boolean;
    require_lockdown_browser: boolean;
    restrict_quantitative_data: boolean;
  }
  

export const courses = [
    {
        "id": 36016,
        "name": "Automaten en Formele Talen",
        "account_id": 84,
        "uuid": "WOukMm7QvY33CtkKpReEE2Hcf3mP17rGumpTwmPB",
        "start_at": null,
        "grading_standard_id": null,
        "is_public": false,
        "created_at": "2022-11-08T11:00:49Z",
        "course_code": "5062AUFT6Y",
        "default_view": "wiki",
        "root_account_id": 1,
        "enrollment_term_id": 259,
        "license": "private",
        "grade_passback_setting": null,
        "end_at": null,
        "public_syllabus": false,
        "public_syllabus_to_auth": true,
        "storage_quota_mb": 1500,
        "is_public_to_auth_users": false,
        "homeroom_course": false,
        "course_color": null,
        "friendly_name": null,
        "apply_assignment_group_weights": true,
        "calendar": {
            "ics": "https://canvas.uva.nl/feeds/calendars/course_WOukMm7QvY33CtkKpReEE2Hcf3mP17rGumpTwmPB.ics"
        },
        "time_zone": "Europe/Amsterdam",
        "blueprint": false,
        "template": false,
        "enrollments": [
            {
                "type": "student",
                "role": "StudentEnrollment",
                "role_id": 3,
                "user_id": 417709,
                "enrollment_state": "active",
                "limit_privileges_to_course_section": false
            }
        ],
        "hide_final_grades": true,
        "workflow_state": "available",
        "restrict_enrollments_to_course_dates": true
    },
    {
        "id": 6052,
        "name": "Bachelor Informatica",
        "account_id": 84,
        "uuid": "sZj6C1yA8tzrSEHlDD8X6dMq5j90mvX2vI1GTgw5",
        "start_at": "2018-10-04T16:50:51Z",
        "grading_standard_id": null,
        "is_public": false,
        "created_at": "2018-07-05T19:58:39Z",
        "course_code": "BSc IN",
        "default_view": "wiki",
        "root_account_id": 1,
        "enrollment_term_id": 1,
        "license": "private",
        "grade_passback_setting": null,
        "end_at": null,
        "public_syllabus": false,
        "public_syllabus_to_auth": true,
        "storage_quota_mb": 1500,
        "is_public_to_auth_users": false,
        "homeroom_course": false,
        "course_color": null,
        "friendly_name": null,
        "apply_assignment_group_weights": false,
        "calendar": {
            "ics": "https://canvas.uva.nl/feeds/calendars/course_sZj6C1yA8tzrSEHlDD8X6dMq5j90mvX2vI1GTgw5.ics"
        },
        "time_zone": "Europe/Amsterdam",
        "blueprint": false,
        "template": false,
        "enrollments": [
            {
                "type": "student",
                "role": "StudentEnrollment",
                "role_id": 3,
                "user_id": 417709,
                "enrollment_state": "active",
                "limit_privileges_to_course_section": false
            },
            {
                "type": "student",
                "role": "StudentEnrollment",
                "role_id": 3,
                "user_id": 417709,
                "enrollment_state": "active",
                "limit_privileges_to_course_section": false
            }
        ],
        "hide_final_grades": true,
        "workflow_state": "available",
        "restrict_enrollments_to_course_dates": false
    },
    {
        "id": 36019,
        "name": "Compiler Construction",
        "account_id": 84,
        "uuid": "HUVDfJI5VESNIiYgeMQStWrOP1OWzcsbf3nCxOmY",
        "start_at": "2023-02-05T23:00:00Z",
        "grading_standard_id": null,
        "is_public": false,
        "created_at": "2022-11-08T11:00:51Z",
        "course_code": "5062COMP6Y",
        "default_view": "wiki",
        "root_account_id": 1,
        "enrollment_term_id": 258,
        "license": "private",
        "grade_passback_setting": null,
        "end_at": null,
        "public_syllabus": false,
        "public_syllabus_to_auth": false,
        "storage_quota_mb": 1500,
        "is_public_to_auth_users": true,
        "homeroom_course": false,
        "course_color": null,
        "friendly_name": null,
        "apply_assignment_group_weights": false,
        "locale": "en-GB",
        "calendar": {
            "ics": "https://canvas.uva.nl/feeds/calendars/course_HUVDfJI5VESNIiYgeMQStWrOP1OWzcsbf3nCxOmY.ics"
        },
        "time_zone": "Europe/Amsterdam",
        "blueprint": false,
        "template": false,
        "enrollments": [
            {
                "type": "student",
                "role": "StudentEnrollment",
                "role_id": 3,
                "user_id": 417709,
                "enrollment_state": "active",
                "limit_privileges_to_course_section": false
            }
        ],
        "hide_final_grades": true,
        "workflow_state": "available",
        "restrict_enrollments_to_course_dates": true
    },
    {
        "id": 36015,
        "name": "Programmeertalen",
        "account_id": 84,
        "uuid": "FFmGTNaQ2tXqi4wMPZqQRRIt9o1bvBzVk2jUAOuM",
        "start_at": "2023-02-05T23:00:00Z",
        "grading_standard_id": null,
        "is_public": false,
        "created_at": "2022-11-08T11:00:49Z",
        "course_code": "5062PROG6Y",
        "default_view": "modules",
        "root_account_id": 1,
        "enrollment_term_id": 258,
        "license": "private",
        "grade_passback_setting": null,
        "end_at": null,
        "public_syllabus": false,
        "public_syllabus_to_auth": false,
        "storage_quota_mb": 1500,
        "is_public_to_auth_users": false,
        "homeroom_course": false,
        "course_color": null,
        "friendly_name": null,
        "apply_assignment_group_weights": false,
        "calendar": {
            "ics": "https://canvas.uva.nl/feeds/calendars/course_FFmGTNaQ2tXqi4wMPZqQRRIt9o1bvBzVk2jUAOuM.ics"
        },
        "time_zone": "Europe/Amsterdam",
        "blueprint": false,
        "template": false,
        "enrollments": [
            {
                "type": "student",
                "role": "StudentEnrollment",
                "role_id": 3,
                "user_id": 417709,
                "enrollment_state": "active",
                "limit_privileges_to_course_section": false
            }
        ],
        "hide_final_grades": true,
        "workflow_state": "available",
        "restrict_enrollments_to_course_dates": true
    },
    {
        "id": 36024,
        "name": "Project Software Engineering",
        "account_id": 84,
        "uuid": "A0rlLayjbZ5hCU3DzQ2pOrN3PVgyjNrhUkGzX2Lj",
        "start_at": "2023-06-04T22:00:00Z",
        "grading_standard_id": null,
        "is_public": false,
        "created_at": "2022-11-08T11:00:53Z",
        "course_code": "5062PRSE5Y",
        "default_view": "wiki",
        "root_account_id": 1,
        "enrollment_term_id": 260,
        "license": "private",
        "grade_passback_setting": null,
        "end_at": null,
        "public_syllabus": false,
        "public_syllabus_to_auth": true,
        "storage_quota_mb": 1500,
        "is_public_to_auth_users": true,
        "homeroom_course": false,
        "course_color": null,
        "friendly_name": null,
        "apply_assignment_group_weights": false,
        "calendar": {
            "ics": "https://canvas.uva.nl/feeds/calendars/course_A0rlLayjbZ5hCU3DzQ2pOrN3PVgyjNrhUkGzX2Lj.ics"
        },
        "time_zone": "Europe/Amsterdam",
        "blueprint": false,
        "template": false,
        "enrollments": [
            {
                "type": "student",
                "role": "StudentEnrollment",
                "role_id": 3,
                "user_id": 417709,
                "enrollment_state": "active",
                "limit_privileges_to_course_section": false
            }
        ],
        "hide_final_grades": true,
        "workflow_state": "available",
        "restrict_enrollments_to_course_dates": false
    },
    {
        "id": 40239,
        "name": "Test course Niels Zwemmer",
        "account_id": 47,
        "uuid": "2iTFszybzWA4Sqgc8xC6HZiWYE6N4ZA6YxYS65Rz",
        "start_at": null,
        "grading_standard_id": null,
        "is_public": false,
        "created_at": "2023-06-05T20:14:26Z",
        "course_code": "TestCourse Niels Zwemmer",
        "default_view": "wiki",
        "root_account_id": 1,
        "enrollment_term_id": 1,
        "license": "private",
        "grade_passback_setting": null,
        "end_at": null,
        "public_syllabus": false,
        "public_syllabus_to_auth": false,
        "storage_quota_mb": 1500,
        "is_public_to_auth_users": false,
        "homeroom_course": false,
        "course_color": null,
        "friendly_name": null,
        "apply_assignment_group_weights": false,
        "calendar": {
            "ics": "https://canvas.uva.nl/feeds/calendars/course_2iTFszybzWA4Sqgc8xC6HZiWYE6N4ZA6YxYS65Rz.ics"
        },
        "time_zone": "Europe/Amsterdam",
        "blueprint": false,
        "template": false,
        "sis_course_id": null,
        "integration_id": null,
        "enrollments": [
            {
                "type": "teacher",
                "role": "TeacherEnrollment",
                "role_id": 4,
                "user_id": 417709,
                "enrollment_state": "active",
                "limit_privileges_to_course_section": false
            }
        ],
        "hide_final_grades": true,
        "workflow_state": "unpublished",
        "restrict_enrollments_to_course_dates": false
    }
]

export const assignments = [
    {
        "id": 410236,
        "description": "<h2>Finite automata for runtime verification</h2>\n<p>De eerste opdracht dient als een korte introductie tot <em>runtime verification</em>. Met behulp van eindige automaten worden de eerste stappen gezet naar het kunnen analyseren/verifiëren van <em>execution traces</em> van&nbsp;<em>Turing machines</em>.</p>\n<p>Lees de opdracht eerst helemaal goed door voordat je aan de slag gaat.<br>Succes!</p>\n<p><em>Let op: Alle praktische opdrachten dienen individueel te worden gemaakt. Inzendingen worden onderworpen aan een plagiaatcontrole.</em></p>\n<p><a class=\"instructure_file_link instructure_scribd_file inline_disabled\" title=\"PO1_2023.pdf\" href=\"https://canvas.uva.nl/courses/36016/files/8535794?verifier=aO8hsEc4r9eZMhrvKP81D1t1qKBWVyWQEDpo6mZG&amp;wrap=1\" target=\"_blank\" data-api-endpoint=\"https://canvas.uva.nl/api/v1/courses/36016/files/8535794\" data-api-returntype=\"File\">PO1_2023.pdf</a><br><a id=\"6531110\" class=\"instructure_file_link instructure_scribd_file inline_disabled\" href=\"https://canvas.uva.nl/courses/36016/files/8480863?verifier=dyNKi7nZib4Hy5l2dJ75fcbdLlHaE87XfqlQD7Lw&amp;wrap=1\" target=\"_blank\" data-canvas-previewable=\"true\" data-api-endpoint=\"https://canvas.uva.nl/api/v1/courses/36016/files/8480863\" data-api-returntype=\"File\"></a><a id=\"6531024\" class=\"instructure_file_link inline_disabled\" href=\"https://canvas.uva.nl/courses/36016/files/8480831?verifier=089Z7gLdgk29gctONxeE443nPc5HbrbRZwRbkcT3&amp;wrap=1\" target=\"_blank\" data-api-endpoint=\"https://canvas.uva.nl/api/v1/courses/36016/files/8480831\" data-api-returntype=\"File\">PO1.tar.gz</a></p>",
        "due_at": "2023-04-30T21:59:00Z",
        "unlock_at": "2023-04-12T09:59:00Z",
        "lock_at": "2023-06-01T21:59:00Z",
        "points_possible": 10,
        "grading_type": "points",
        "assignment_group_id": 120382,
        "grading_standard_id": null,
        "created_at": "2023-03-31T11:42:43Z",
        "updated_at": "2023-05-09T16:04:58Z",
        "peer_reviews": false,
        "automatic_peer_reviews": false,
        "position": 4,
        "grade_group_students_individually": false,
        "anonymous_peer_reviews": false,
        "group_category_id": null,
        "post_to_sis": false,
        "moderated_grading": false,
        "omit_from_final_grade": false,
        "intra_group_peer_reviews": false,
        "anonymous_instructor_annotations": false,
        "anonymous_grading": false,
        "graders_anonymous_to_graders": false,
        "grader_count": 0,
        "grader_comments_visible_to_graders": true,
        "final_grader_id": null,
        "grader_names_visible_to_final_grader": true,
        "allowed_attempts": -1,
        "annotatable_attachment_id": null,
        "hide_in_gradebook": false,
        "lock_info": {
            "lock_at": "2023-06-01T21:59:00Z",
            "can_view": true,
            "asset_string": "assignment_410236"
        },
        "secure_params": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsdGlfYXNzaWdubWVudF9pZCI6IjdkZDVjMzdhLWQyMjItNDBjYi1hMzU2LWEyMTg5ZjdlYjNjNiIsImx0aV9hc3NpZ25tZW50X2Rlc2NyaXB0aW9uIjoiXHUwMDNjaDJcdTAwM2VGaW5pdGUgYXV0b21hdGEgZm9yIHJ1bnRpbWUgdmVyaWZpY2F0aW9uXHUwMDNjL2gyXHUwMDNlXG5cdTAwM2NwXHUwMDNlRGUgZWVyc3RlIG9wZHJhY2h0IGRpZW50IGFscyBlZW4ga29ydGUgaW50cm9kdWN0aWUgdG90IFx1MDAzY2VtXHUwMDNlcnVudGltZSB2ZXJpZmljYXRpb25cdTAwM2MvZW1cdTAwM2UuIE1ldCBiZWh1bHAgdmFuIGVpbmRpZ2UgYXV0b21hdGVuIHdvcmRlbiBkZSBlZXJzdGUgc3RhcHBlbiBnZXpldCBuYWFyIGhldCBrdW5uZW4gYW5hbHlzZXJlbi92ZXJpZmnDq3JlbiB2YW4gXHUwMDNjZW1cdTAwM2VleGVjdXRpb24gdHJhY2VzXHUwMDNjL2VtXHUwMDNlIHZhblx1MDAyNm5ic3A7XHUwMDNjZW1cdTAwM2VUdXJpbmcgbWFjaGluZXNcdTAwM2MvZW1cdTAwM2UuXHUwMDNjL3BcdTAwM2Vcblx1MDAzY3BcdTAwM2VMZWVzIGRlIG9wZHJhY2h0IGVlcnN0IGhlbGVtYWFsIGdvZWQgZG9vciB2b29yZGF0IGplIGFhbiBkZSBzbGFnIGdhYXQuXHUwMDNjYnJcdTAwM2VTdWNjZXMhXHUwMDNjL3BcdTAwM2Vcblx1MDAzY3BcdTAwM2VcdTAwM2NlbVx1MDAzZUxldCBvcDogQWxsZSBwcmFrdGlzY2hlIG9wZHJhY2h0ZW4gZGllbmVuIGluZGl2aWR1ZWVsIHRlIHdvcmRlbiBnZW1hYWt0LiBJbnplbmRpbmdlbiB3b3JkZW4gb25kZXJ3b3JwZW4gYWFuIGVlbiBwbGFnaWFhdGNvbnRyb2xlLlx1MDAzYy9lbVx1MDAzZVx1MDAzYy9wXHUwMDNlXG5cdTAwM2NwXHUwMDNlXHUwMDNjYSBjbGFzcz1cImluc3RydWN0dXJlX2ZpbGVfbGluayBpbnN0cnVjdHVyZV9zY3JpYmRfZmlsZSBpbmxpbmVfZGlzYWJsZWRcIiB0aXRsZT1cIlBPMV8yMDIzLnBkZlwiIGhyZWY9XCIvY291cnNlcy8zNjAxNi9maWxlcy84NTM1Nzk0P3dyYXA9MVwiIHRhcmdldD1cIl9ibGFua1wiXHUwMDNlUE8xXzIwMjMucGRmXHUwMDNjL2FcdTAwM2VcdTAwM2Niclx1MDAzZVx1MDAzY2EgaWQ9XCI2NTMxMTEwXCIgY2xhc3M9XCJpbnN0cnVjdHVyZV9maWxlX2xpbmsgaW5zdHJ1Y3R1cmVfc2NyaWJkX2ZpbGUgaW5saW5lX2Rpc2FibGVkXCIgaHJlZj1cIi9jb3Vyc2VzLzM2MDE2L2ZpbGVzLzg0ODA4NjM_d3JhcD0xXCIgdGFyZ2V0PVwiX2JsYW5rXCIgZGF0YS1jYW52YXMtcHJldmlld2FibGU9XCJ0cnVlXCIgZGF0YS1hcGktZW5kcG9pbnQ9XCJodHRwczovL2NhbnZhcy51dmEubmwvYXBpL3YxL2NvdXJzZXMvMzYwMTYvZmlsZXMvODQ4MDg2M1wiIGRhdGEtYXBpLXJlLi4uICh0cnVuY2F0ZWQpIn0.8n52gc6nNHOiEvcFpTOIGg6DBG4aldqVSfeMOzg10ok",
        "lti_context_id": "7dd5c37a-d222-40cb-a356-a2189f7eb3c6",
        "course_id": 36016,
        "name": "Praktische Opdracht 1",
        "submission_types": [
            "external_tool"
        ],
        "has_submitted_submissions": true,
        "due_date_required": false,
        "max_name_length": 255,
        "in_closed_grading_period": false,
        "graded_submissions_exist": true,
        "is_quiz_assignment": false,
        "can_duplicate": false,
        "original_course_id": null,
        "original_assignment_id": null,
        "original_lti_resource_link_id": null,
        "original_assignment_name": null,
        "original_quiz_id": null,
        "workflow_state": "published",
        "important_dates": false,
        "external_tool_tag_attributes": {
            "url": "https://uva.codegra.de/api/v1/lti/launch/1",
            "new_tab": false,
            "resource_link_id": "b2f21651f751a6144ef7ce472089c2e48d807154",
            "external_data": "",
            "content_type": "ContextExternalTool",
            "content_id": 37,
            "custom_params": null
        },
        "muted": false,
        "html_url": "https://canvas.uva.nl/courses/36016/assignments/410236",
        "url": "https://canvas.uva.nl/api/v1/courses/36016/external_tools/sessionless_launch?assignment_id=410236&launch_type=assessment",
        "published": true,
        "only_visible_to_overrides": false,
        "locked_for_user": true,
        "lock_explanation": "This assignment was locked 1 Jun at 23:59.",
        "submissions_download_url": "https://canvas.uva.nl/courses/36016/assignments/410236/submissions?zip=1",
        "post_manually": true,
        "anonymize_students": false,
        "require_lockdown_browser": false,
        "restrict_quantitative_data": false
    },
    {
        "id": 410237,
        "description": "<h2>Verification of Turing machine properties</h2>\n<p>De tweede opdracht gaat verder met het analyseren van <em>e</em><em>xecution traces</em> van&nbsp;<em>Turing machines</em>. Aan de orde komt de verificatie van twee basiseigenschappen van Turing machines door middel van <em>pushdown automaten</em>.</p>\n<p>Lees de opdracht eerst helemaal goed door voordat je aan de slag gaat.<br>Succes!</p>\n<p><em>Let op: Alle praktische opdrachten dienen individueel te worden gemaakt. Inzendingen worden onderworpen aan een plagiaatcontrole.</em></p>\n<p><em><a class=\"instructure_file_link instructure_scribd_file inline_disabled\" title=\"PO2_2023.pdf\" href=\"https://canvas.uva.nl/courses/36016/files/8645561?verifier=dE2TjPs9zPg5jupclVf2PdmRGSieTPAeA0EEGtv4&amp;wrap=1\" target=\"_blank\" data-api-endpoint=\"https://canvas.uva.nl/api/v1/courses/36016/files/8645561\" data-api-returntype=\"File\">PO2_2023.pdf</a><br></em><em><a id=\"6656804\" class=\"instructure_file_link inline_disabled\" href=\"https://canvas.uva.nl/courses/36016/files/8480859?verifier=nB2hMxw6u8hiA4LkODu6Ca7ryCHUORcDxUwcj0ND&amp;wrap=1\" target=\"_blank\" data-api-endpoint=\"https://canvas.uva.nl/api/v1/courses/36016/files/8480859\" data-api-returntype=\"File\">PO2.tar.gz</a></em></p>",
        "due_at": "2023-05-21T21:59:00Z",
        "unlock_at": "2023-05-10T09:59:59Z",
        "lock_at": "2023-06-01T21:59:00Z",
        "points_possible": 10,
        "grading_type": "points",
        "assignment_group_id": 120382,
        "grading_standard_id": null,
        "created_at": "2023-03-31T11:42:43Z",
        "updated_at": "2023-05-10T22:14:55Z",
        "peer_reviews": false,
        "automatic_peer_reviews": false,
        "position": 5,
        "grade_group_students_individually": false,
        "anonymous_peer_reviews": false,
        "group_category_id": null,
        "post_to_sis": false,
        "moderated_grading": false,
        "omit_from_final_grade": false,
        "intra_group_peer_reviews": false,
        "anonymous_instructor_annotations": false,
        "anonymous_grading": false,
        "graders_anonymous_to_graders": false,
        "grader_count": 0,
        "grader_comments_visible_to_graders": true,
        "final_grader_id": null,
        "grader_names_visible_to_final_grader": true,
        "allowed_attempts": -1,
        "annotatable_attachment_id": null,
        "hide_in_gradebook": false,
        "lock_info": {
            "lock_at": "2023-06-01T21:59:00Z",
            "can_view": true,
            "asset_string": "assignment_410237"
        },
        "secure_params": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsdGlfYXNzaWdubWVudF9pZCI6IjM0YWJmOTc0LWFmMWQtNDY0YS04MjRjLTUzNGI1ODcwODQ5MyIsImx0aV9hc3NpZ25tZW50X2Rlc2NyaXB0aW9uIjoiXHUwMDNjaDJcdTAwM2VWZXJpZmljYXRpb24gb2YgVHVyaW5nIG1hY2hpbmUgcHJvcGVydGllc1x1MDAzYy9oMlx1MDAzZVxuXHUwMDNjcFx1MDAzZURlIHR3ZWVkZSBvcGRyYWNodCBnYWF0IHZlcmRlciBtZXQgaGV0IGFuYWx5c2VyZW4gdmFuIFx1MDAzY2VtXHUwMDNlZVx1MDAzYy9lbVx1MDAzZVx1MDAzY2VtXHUwMDNleGVjdXRpb24gdHJhY2VzXHUwMDNjL2VtXHUwMDNlIHZhblx1MDAyNm5ic3A7XHUwMDNjZW1cdTAwM2VUdXJpbmcgbWFjaGluZXNcdTAwM2MvZW1cdTAwM2UuIEFhbiBkZSBvcmRlIGtvbXQgZGUgdmVyaWZpY2F0aWUgdmFuIHR3ZWUgYmFzaXNlaWdlbnNjaGFwcGVuIHZhbiBUdXJpbmcgbWFjaGluZXMgZG9vciBtaWRkZWwgdmFuIFx1MDAzY2VtXHUwMDNlcHVzaGRvd24gYXV0b21hdGVuXHUwMDNjL2VtXHUwMDNlLlx1MDAzYy9wXHUwMDNlXG5cdTAwM2NwXHUwMDNlTGVlcyBkZSBvcGRyYWNodCBlZXJzdCBoZWxlbWFhbCBnb2VkIGRvb3Igdm9vcmRhdCBqZSBhYW4gZGUgc2xhZyBnYWF0Llx1MDAzY2JyXHUwMDNlU3VjY2VzIVx1MDAzYy9wXHUwMDNlXG5cdTAwM2NwXHUwMDNlXHUwMDNjZW1cdTAwM2VMZXQgb3A6IEFsbGUgcHJha3Rpc2NoZSBvcGRyYWNodGVuIGRpZW5lbiBpbmRpdmlkdWVlbCB0ZSB3b3JkZW4gZ2VtYWFrdC4gSW56ZW5kaW5nZW4gd29yZGVuIG9uZGVyd29ycGVuIGFhbiBlZW4gcGxhZ2lhYXRjb250cm9sZS5cdTAwM2MvZW1cdTAwM2VcdTAwM2MvcFx1MDAzZVxuXHUwMDNjcFx1MDAzZVx1MDAzY2VtXHUwMDNlXHUwMDNjYSBjbGFzcz1cImluc3RydWN0dXJlX2ZpbGVfbGluayBpbnN0cnVjdHVyZV9zY3JpYmRfZmlsZSBpbmxpbmVfZGlzYWJsZWRcIiB0aXRsZT1cIlBPMl8yMDIzLnBkZlwiIGhyZWY9XCIvY291cnNlcy8zNjAxNi9maWxlcy84NjQ1NTYxP3dyYXA9MVwiIHRhcmdldD1cIl9ibGFua1wiXHUwMDNlUE8yXzIwMjMucGRmXHUwMDNjL2FcdTAwM2VcdTAwM2Niclx1MDAzZVx1MDAzYy9lbVx1MDAzZVx1MDAzY2VtXHUwMDNlXHUwMDNjYSBpZD1cIjY2NTY4MDRcIiBjbGFzcz1cImluc3RydWN0dXJlX2ZpbGVfbGluayBpbmxpbmVfZGlzYWJsZWRcIiBocmVmPVwiL2NvdXJzZXMvMzYwMTYvZmlsZXMvODQ4MDg1OT93cmFwPTFcIiB0YXJnZXQ9XCJfYmxhbmtcIiBkYXRhLWFwaS1lbmRwb2ludD1cImh0dHBzOi8vY2FudmFzLnV2YS5ubC9hcGkvdjEvY291cnNlcy8zNjAxNi9maWxlcy84NDgwODU5XCIgZGF0YS1hcGktcmV0dXJudHlwZT1cIkZpbGVcIlx1MDAzZVBPMi50YXIuZ3pcdTAwM2MvYVx1MDAzZVx1MDAzYy9lbVx1MDAzZVx1MDAzYy9wXHUwMDNlIn0.gsHt_4CWxumCokvsh2HRan9un-gFuzQmKBT0OmxM9ek",
        "lti_context_id": "34abf974-af1d-464a-824c-534b58708493",
        "course_id": 36016,
        "name": "Praktische Opdracht 2",
        "submission_types": [
            "external_tool"
        ],
        "has_submitted_submissions": true,
        "due_date_required": false,
        "max_name_length": 255,
        "in_closed_grading_period": false,
        "graded_submissions_exist": true,
        "is_quiz_assignment": false,
        "can_duplicate": false,
        "original_course_id": null,
        "original_assignment_id": null,
        "original_lti_resource_link_id": null,
        "original_assignment_name": null,
        "original_quiz_id": null,
        "workflow_state": "published",
        "important_dates": false,
        "external_tool_tag_attributes": {
            "url": "https://uva.codegra.de/api/v1/lti/launch/1",
            "new_tab": false,
            "resource_link_id": "46c2ac8e2b9e56b96bb5044fd761049ea85f88cb",
            "external_data": "",
            "content_type": "ContextExternalTool",
            "content_id": 37,
            "custom_params": null
        },
        "muted": true,
        "html_url": "https://canvas.uva.nl/courses/36016/assignments/410237",
        "url": "https://canvas.uva.nl/api/v1/courses/36016/external_tools/sessionless_launch?assignment_id=410237&launch_type=assessment",
        "published": true,
        "only_visible_to_overrides": false,
        "locked_for_user": true,
        "lock_explanation": "This assignment was locked 1 Jun at 23:59.",
        "submissions_download_url": "https://canvas.uva.nl/courses/36016/assignments/410237/submissions?zip=1",
        "post_manually": false,
        "anonymize_students": false,
        "require_lockdown_browser": false,
        "restrict_quantitative_data": false
    },
    {
        "id": 410238,
        "description": "<h2>Reverse engineering a Turing machine</h2>\n<p>In de laatste opdracht wordt dieper ingegaan op de relatie tussen de execution trace(s) en de Turing machine die ze genereert. Er wordt kennis genomen van het extraheren van de <em>input/output</em>, alsook het reconstrueren (<span>reverse engineer-en) van een originele Turing machine gegeven een bijbehorende verzameling traces.</span></p>\n<p>Lees de opdracht eerst helemaal goed door voordat je aan de slag gaat.<br>Succes!</p>\n<p><em>Let op: Alle praktische opdrachten dienen individueel te worden gemaakt. Inzendingen worden onderworpen aan een plagiaatcontrole.</em></p>\n<p><em><a class=\"instructure_file_link instructure_scribd_file inline_disabled\" title=\"PO3_2023.pdf\" href=\"https://canvas.uva.nl/courses/36016/files/8752876?verifier=Mjx3xECXPcQ2Rp4ydb1qkwbbMWIeptprNPtc7Yet&amp;wrap=1\" target=\"_blank\" data-api-endpoint=\"https://canvas.uva.nl/api/v1/courses/36016/files/8752876\" data-api-returntype=\"File\">PO3_2023.pdf</a><br><a id=\"6741648\" class=\"instructure_file_link inline_disabled\" href=\"https://canvas.uva.nl/courses/36016/files/8480857?verifier=dK9SGny5aK8LyRnbZPbhR2EM2RuWT2YJUaYTDSDg&amp;wrap=1\" target=\"_blank\" data-api-endpoint=\"https://canvas.uva.nl/api/v1/courses/36016/files/8480857\" data-api-returntype=\"File\">PO3.tar.gz</a></em></p>",
        "due_at": "2023-06-09T21:59:59Z",
        "unlock_at": "2023-05-21T21:59:59Z",
        "lock_at": "2023-06-29T21:59:00Z",
        "points_possible": 10,
        "grading_type": "points",
        "assignment_group_id": 120382,
        "grading_standard_id": null,
        "created_at": "2023-03-31T11:42:43Z",
        "updated_at": "2023-05-23T09:36:37Z",
        "peer_reviews": false,
        "automatic_peer_reviews": false,
        "position": 6,
        "grade_group_students_individually": false,
        "anonymous_peer_reviews": false,
        "group_category_id": null,
        "post_to_sis": false,
        "moderated_grading": false,
        "omit_from_final_grade": false,
        "intra_group_peer_reviews": false,
        "anonymous_instructor_annotations": false,
        "anonymous_grading": false,
        "graders_anonymous_to_graders": false,
        "grader_count": 0,
        "grader_comments_visible_to_graders": true,
        "final_grader_id": null,
        "grader_names_visible_to_final_grader": true,
        "allowed_attempts": -1,
        "annotatable_attachment_id": null,
        "hide_in_gradebook": false,
        "secure_params": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsdGlfYXNzaWdubWVudF9pZCI6IjdkNzBhMjRlLWI2ZDYtNGNjOC05MGEyLWYxZDY5NjJiMmNkYiIsImx0aV9hc3NpZ25tZW50X2Rlc2NyaXB0aW9uIjoiXHUwMDNjaDJcdTAwM2VSZXZlcnNlIGVuZ2luZWVyaW5nIGEgVHVyaW5nIG1hY2hpbmVcdTAwM2MvaDJcdTAwM2Vcblx1MDAzY3BcdTAwM2VJbiBkZSBsYWF0c3RlIG9wZHJhY2h0IHdvcmR0IGRpZXBlciBpbmdlZ2FhbiBvcCBkZSByZWxhdGllIHR1c3NlbiBkZSBleGVjdXRpb24gdHJhY2UocykgZW4gZGUgVHVyaW5nIG1hY2hpbmUgZGllIHplIGdlbmVyZWVydC4gRXIgd29yZHQga2VubmlzIGdlbm9tZW4gdmFuIGhldCBleHRyYWhlcmVuIHZhbiBkZSBcdTAwM2NlbVx1MDAzZWlucHV0L291dHB1dFx1MDAzYy9lbVx1MDAzZSwgYWxzb29rIGhldCByZWNvbnN0cnVlcmVuIChcdTAwM2NzcGFuXHUwMDNlcmV2ZXJzZSBlbmdpbmVlci1lbikgdmFuIGVlbiBvcmlnaW5lbGUgVHVyaW5nIG1hY2hpbmUgZ2VnZXZlbiBlZW4gYmlqYmVob3JlbmRlIHZlcnphbWVsaW5nIHRyYWNlcy5cdTAwM2Mvc3Bhblx1MDAzZVx1MDAzYy9wXHUwMDNlXG5cdTAwM2NwXHUwMDNlTGVlcyBkZSBvcGRyYWNodCBlZXJzdCBoZWxlbWFhbCBnb2VkIGRvb3Igdm9vcmRhdCBqZSBhYW4gZGUgc2xhZyBnYWF0Llx1MDAzY2JyXHUwMDNlU3VjY2VzIVx1MDAzYy9wXHUwMDNlXG5cdTAwM2NwXHUwMDNlXHUwMDNjZW1cdTAwM2VMZXQgb3A6IEFsbGUgcHJha3Rpc2NoZSBvcGRyYWNodGVuIGRpZW5lbiBpbmRpdmlkdWVlbCB0ZSB3b3JkZW4gZ2VtYWFrdC4gSW56ZW5kaW5nZW4gd29yZGVuIG9uZGVyd29ycGVuIGFhbiBlZW4gcGxhZ2lhYXRjb250cm9sZS5cdTAwM2MvZW1cdTAwM2VcdTAwM2MvcFx1MDAzZVxuXHUwMDNjcFx1MDAzZVx1MDAzY2VtXHUwMDNlXHUwMDNjYSBjbGFzcz1cImluc3RydWN0dXJlX2ZpbGVfbGluayBpbnN0cnVjdHVyZV9zY3JpYmRfZmlsZSBpbmxpbmVfZGlzYWJsZWRcIiB0aXRsZT1cIlBPM18yMDIzLnBkZlwiIGhyZWY9XCIvY291cnNlcy8zNjAxNi9maWxlcy84NzUyODc2P3dyYXA9MVwiIHRhcmdldD1cIl9ibGFua1wiIGRhdGEtYXBpLWVuZHBvaW50PVwiaHR0cHM6Ly9jYW52YXMudXZhLm5sL2FwaS92MS9jb3Vyc2VzLzM2MDE2L2ZpbGVzLzg3NTI4NzZcIiBkYXRhLWFwaS1yZXR1cm50eXBlPVwiRmlsZVwiXHUwMDNlUE8zXzIwMjMucGRmXHUwMDNjL2FcdTAwM2VcdTAwM2Niclx1MDAzZVx1MDAzY2EgaWQ9XCI2NzQxNjQ4XCIgY2xhc3M9XCJpbnN0cnVjdHVyZV9maWxlX2xpbmsgaW5saW5lX2Rpc2FibGVkXCIgaHJlZj1cIi9jb3Vyc2UuLi4gKHRydW5jYXRlZCkifQ.KYLvOer0Dqp_yxJgf3afo0yj5BFwNvrhjgYyDXVzuX4",
        "lti_context_id": "7d70a24e-b6d6-4cc8-90a2-f1d6962b2cdb",
        "course_id": 36016,
        "name": "Praktische Opdracht 3",
        "submission_types": [
            "external_tool"
        ],
        "has_submitted_submissions": true,
        "due_date_required": false,
        "max_name_length": 255,
        "in_closed_grading_period": false,
        "graded_submissions_exist": false,
        "is_quiz_assignment": false,
        "can_duplicate": false,
        "original_course_id": null,
        "original_assignment_id": null,
        "original_lti_resource_link_id": null,
        "original_assignment_name": null,
        "original_quiz_id": null,
        "workflow_state": "published",
        "important_dates": false,
        "external_tool_tag_attributes": {
            "url": "https://uva.codegra.de/api/v1/lti/launch/1",
            "new_tab": false,
            "resource_link_id": "c5318dd2f83fd5c965e8fe72e7fff80bee9a42f0",
            "external_data": "",
            "content_type": "ContextExternalTool",
            "content_id": 37,
            "custom_params": null
        },
        "muted": true,
        "html_url": "https://canvas.uva.nl/courses/36016/assignments/410238",
        "url": "https://canvas.uva.nl/api/v1/courses/36016/external_tools/sessionless_launch?assignment_id=410238&launch_type=assessment",
        "published": true,
        "only_visible_to_overrides": false,
        "locked_for_user": false,
        "submissions_download_url": "https://canvas.uva.nl/courses/36016/assignments/410238/submissions?zip=1",
        "post_manually": true,
        "anonymize_students": false,
        "require_lockdown_browser": false,
        "restrict_quantitative_data": false
    },
    {
        "id": 410234,
        "description": "",
        "due_at": "2023-06-29T21:59:00Z",
        "unlock_at": null,
        "lock_at": null,
        "points_possible": 10,
        "grading_type": "points",
        "assignment_group_id": 120385,
        "grading_standard_id": null,
        "created_at": "2023-03-31T11:42:43Z",
        "updated_at": "2023-05-12T17:15:51Z",
        "peer_reviews": false,
        "automatic_peer_reviews": false,
        "position": 2,
        "grade_group_students_individually": false,
        "anonymous_peer_reviews": false,
        "group_category_id": null,
        "post_to_sis": false,
        "moderated_grading": false,
        "omit_from_final_grade": false,
        "intra_group_peer_reviews": false,
        "anonymous_instructor_annotations": false,
        "anonymous_grading": false,
        "graders_anonymous_to_graders": false,
        "grader_count": 0,
        "grader_comments_visible_to_graders": true,
        "final_grader_id": null,
        "grader_names_visible_to_final_grader": true,
        "allowed_attempts": -1,
        "annotatable_attachment_id": null,
        "hide_in_gradebook": false,
        "secure_params": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsdGlfYXNzaWdubWVudF9pZCI6IjI0M2ZlYTdmLTUwYWEtNGZiOS04NWU2LWJlMTE3YzM1NjNhMiIsImx0aV9hc3NpZ25tZW50X2Rlc2NyaXB0aW9uIjoiIn0.7sXJhgk2Nn36NspNkeGcc3so_qZYf297T79xskJad8c",
        "lti_context_id": "243fea7f-50aa-4fb9-85e6-be117c3563a2",
        "course_id": 36016,
        "name": "Deeltoets 1 (25.04.2023)",
        "submission_types": [
            "none"
        ],
        "has_submitted_submissions": false,
        "due_date_required": false,
        "max_name_length": 255,
        "in_closed_grading_period": false,
        "graded_submissions_exist": true,
        "is_quiz_assignment": false,
        "can_duplicate": true,
        "original_course_id": null,
        "original_assignment_id": null,
        "original_lti_resource_link_id": null,
        "original_assignment_name": null,
        "original_quiz_id": null,
        "workflow_state": "published",
        "important_dates": false,
        "muted": false,
        "html_url": "https://canvas.uva.nl/courses/36016/assignments/410234",
        "published": true,
        "only_visible_to_overrides": false,
        "locked_for_user": false,
        "submissions_download_url": "https://canvas.uva.nl/courses/36016/assignments/410234/submissions?zip=1",
        "post_manually": true,
        "anonymize_students": false,
        "require_lockdown_browser": false,
        "restrict_quantitative_data": false
    }
]