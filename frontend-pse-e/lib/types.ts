import { HighlightArea, } from '@react-pdf-viewer/highlight';

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
    allowed_attempts: number | string;
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
    has_submitted: boolean;
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

export interface Submission {
    userId: number;
    assignmentId: number;
    date: string;
    grade: number;
    status: string;
    filetype: string;
    filename: string;
    fileData: Buffer;
    fileNotes: object[];
}

export interface Badge {
    badgeId: Number,
    iconId: Number,
    experiencePoints: Number,
    name: String,
    description: String,
}


export interface Enrollment {
    id: number;
    course_id: number;
    sis_course_id: string | null;
    course_integration_id: string | null;
    course_section_id: number;
    section_integration_id: string | null;
    sis_account_id: string | null;
    sis_section_id: string | null;
    sis_user_id: string | null;
    enrollment_state: string;
    limit_privileges_to_course_section: boolean;
    sis_import_id: number | null;
    root_account_id: number;
    type: string;
    user_id: number;
    associated_user_id: number | null;
    role: string;
    role_id: number;
    created_at: string;
    updated_at: string;
    start_at: string;
    end_at: string;
    last_activity_at: string;
    last_attended_at: string;
    total_activity_time: number;
    html_url: string;
    grades: {
        html_url: string;
        current_score: number;
        current_grade: string | null;
        final_score: number;
        final_grade: string | null;
    };
    user: {
        id: number;
        name: string;
        sortable_name: string;
        short_name: string;
    };
    override_grade: string;
    override_score: number;
    unposted_current_grade: string;
    unposted_final_grade: string;
    unposted_current_score: string;
    unposted_final_score: string;
    has_grading_periods: boolean | undefined;
    totals_for_all_grading_periods_option: boolean | undefined;
    current_grading_period_title: string | null | undefined;
    current_grading_period_id: number | null | undefined;
    current_period_override_grade: string;
    current_period_override_score: number;
    current_period_unposted_current_score: number | null | undefined;
    current_period_unposted_final_score: number | null | undefined;
    current_period_unposted_current_grade: string | null | undefined;
    current_period_unposted_final_grade: string | null | undefined;
}

export interface User {
    id: number;
    name: string;
    sortable_name: string;
    last_name: string;
    first_name: string;
    short_name: string;
    sis_user_id: string | null;
    sis_import_id: number | null;
    integration_id: string | null;
    login_id: string;
    avatar_url: string | null;
    avatar_state: string | null;
    enrollments: Enrollment[] | null;
    email: string | null;
    locale: string | null;
    last_login: string | null;
    time_zone: string | null;
    bio: string | null;
    userId: number;
    pictureId: number;
    experiencePoints: number;
    badges: BadgeModel[];
    level: number;
}

interface BadgeModel {
    badgeId: number;
    courseId: number;
    assignmentId: number;
    graderId: number;
    comment: string;
}

export interface Note {
    id: number;
    content: string;
    highlightAreas: HighlightArea[];
    quote: string;
}



export interface TokenResponse {
    access_token: string;
    token_type: string;
    user: {
        id: number;
        name: string;
        global_id: string;
        effective_locale: string;
    };
    canvas_region: string;
    refresh_token: string;
    expires_in: number;
}